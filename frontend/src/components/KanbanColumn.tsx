import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import CandidateCard from './CandidateCard';
import { Candidate, InterviewStep } from '../services/positionService';

interface KanbanColumnProps {
    step: InterviewStep;
    candidates: Candidate[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ step, candidates }) => {
    const { setNodeRef } = useDroppable({ id: step.id });

    return (
        <div className="kanban-column" style={{ minWidth: '250px', flex: 1, margin: '0 10px' }}>
            <h5 className="mb-3 p-2 bg-light border-bottom text-center rounded-top">{step.name}</h5>
            <div
                ref={setNodeRef}
                className="column-content p-2 bg-light rounded-bottom"
                style={{ minHeight: '500px' }}
            >
                <SortableContext items={candidates.map(c => c.id)} strategy={verticalListSortingStrategy}>
                    {candidates.map(candidate => (
                        <CandidateCard key={candidate.id} candidate={candidate} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
};

export default KanbanColumn;
