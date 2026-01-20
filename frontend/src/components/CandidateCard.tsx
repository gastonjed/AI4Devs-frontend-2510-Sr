import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from 'react-bootstrap';
import { Candidate } from '../services/positionService';

interface CandidateCardProps {
    candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: candidate.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        marginBottom: '10px'
    };

    const renderScoreDots = (score: number) => {
        // Backend provides a 0-5 score directly
        const dots = [];
        for (let i = 1; i <= 5; i++) {
            dots.push(
                <span
                    key={i}
                    style={{
                        display: 'inline-block',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: i <= score ? '#28a745' : '#e0e0e0',
                        marginRight: '6px'
                    }}
                />
            );
        }
        return dots;
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card className="shadow-sm border-0" style={{ borderRadius: '8px' }}>
                <Card.Body className="p-3">
                    <Card.Title className="mb-2" style={{ fontSize: '1rem', fontWeight: 600 }}>
                        {candidate.firstName} {candidate.lastName}
                    </Card.Title>
                    <div className="d-flex align-items-center">
                        {renderScoreDots(candidate.averageScore)}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CandidateCard;
