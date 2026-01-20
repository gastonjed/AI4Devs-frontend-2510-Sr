import React, { useState } from 'react';
import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import { Candidate, InterviewStep } from '../services/positionService';
import { updateCandidateStep } from '../services/candidateService';

interface KanbanBoardProps {
    steps: InterviewStep[];
    initialCandidates: Candidate[];
    positionId: string;
    isMockMode?: boolean;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ steps, initialCandidates, positionId, isMockMode = false }) => {
    const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const candidateId = active.id as string;
        const overId = over.id as string;

        // Check if dragged over a column or another candidate
        const isOverColumn = steps.some(step => step.id === overId);
        let newStepId = overId;

        if (!isOverColumn) {
            const overCandidate = candidates.find(c => c.id === overId);
            if (overCandidate) {
                newStepId = overCandidate.currentStage;
            } else {
                return;
            }
        }

        const draggingCandidate = candidates.find(c => c.id === candidateId);
        if (draggingCandidate && draggingCandidate.currentStage !== newStepId) {
            // Optimistic update
            const updatedCandidates = candidates.map(c =>
                c.id === candidateId ? { ...c, currentStage: newStepId } : c
            );
            setCandidates(updatedCandidates);

            if (isMockMode) {
                console.log('Mock Mode: Skipping actual API call for stage update');
                return;
            }

            try {
                // The backend requires applicationId, candidateId (as param), and stepId
                const applicationId = (draggingCandidate as any).applicationId || candidateId;
                await updateCandidateStep(candidateId, applicationId, newStepId);
            } catch (error) {
                console.error('Failed to update candidate stage:', error);
                // Rollback on error
                setCandidates(candidates);
            }
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
        >
            <div className="d-flex overflow-auto pb-3" style={{ minHeight: '600px' }}>
                {steps.map(step => (
                    <KanbanColumn
                        key={step.id}
                        step={step}
                        candidates={candidates.filter(c => c.currentStage === step.id)}
                    />
                ))}
            </div>
        </DndContext>
    );
};

export default KanbanBoard;
