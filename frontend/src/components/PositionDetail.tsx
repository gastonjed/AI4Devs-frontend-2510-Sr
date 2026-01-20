import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Spinner, Alert } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import KanbanBoard from './KanbanBoard';
import { getInterviewFlow, getCandidatesByPosition, InterviewStep, Candidate } from '../services/positionService';

const PositionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [steps, setSteps] = useState<InterviewStep[]>([]);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isMockMode, setIsMockMode] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                setLoading(true);
                setError(null);
                const [flowData, candidatesData] = await Promise.all([
                    getInterviewFlow(id),
                    getCandidatesByPosition(id)
                ]);
                setSteps(flowData.sort((a, b) => a.order - b.order));
                setCandidates(candidatesData);
                setIsMockMode(false);
            } catch (err: any) {
                console.error('API Error, falling back to mock data:', err);
                // Fallback Mock Data
                const mockFlow: InterviewStep[] = [
                    { id: 'step-1', name: 'Entrevista Inicial', order: 1 },
                    { id: 'step-2', name: 'Prueba Técnica', order: 2 },
                    { id: 'step-3', name: 'Entrevista Final', order: 3 },
                    { id: 'step-4', name: 'Oferta', order: 4 }
                ];
                const mockCandidates: Candidate[] = [
                    { id: 'c1', firstName: 'Juan', lastName: 'Pérez', email: 'juan@example.com', phoneNumber: '123', averageScore: 8.5, currentStage: 'step-1' },
                    { id: 'c2', firstName: 'María', lastName: 'García', email: 'maria@example.com', phoneNumber: '456', averageScore: 9.0, currentStage: 'step-1' },
                    { id: 'c3', firstName: 'Luis', lastName: 'Rodríguez', email: 'luis@example.com', phoneNumber: '789', averageScore: 7.0, currentStage: 'step-2' },
                    { id: 'c4', firstName: 'Ana', lastName: 'Martínez', email: 'ana@example.com', phoneNumber: '000', averageScore: 10.0, currentStage: 'step-3' }
                ];
                setSteps(mockFlow);
                setCandidates(mockCandidates);
                setIsMockMode(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p>Cargando detalles de la posición...</p>
            </Container>
        );
    }

    return (
        <Container fluid className="mt-4 px-4">
            {isMockMode && (
                <Alert variant="warning" className="py-2 mb-3 shadow-sm border-0" style={{ borderRadius: '8px' }}>
                    <strong>Modo Demo Activo:</strong> El servidor backend no está disponible. Mostrando datos de prueba.
                </Alert>
            )}
            <div className="d-flex align-items-center mb-4">
                <Button
                    variant="outline-secondary"
                    className="me-3 rounded-circle d-flex align-items-center justify-content-center border-0 shadow-sm"
                    style={{ width: '40px', height: '40px' }}
                    onClick={() => navigate('/positions')}
                >
                    <ArrowLeft size={20} />
                </Button>
                <h2 className="mb-0" style={{ fontWeight: 700 }}>Pipeline de Selección</h2>
            </div>

            {steps.length > 0 ? (
                <KanbanBoard
                    steps={steps}
                    initialCandidates={candidates}
                    positionId={id!}
                    isMockMode={isMockMode}
                />
            ) : (
                <Alert variant="info" className="border-0 shadow-sm" style={{ borderRadius: '8px' }}>
                    No se han definido pasos de entrevista para esta posición.
                </Alert>
            )}
        </Container>
    );
};

export default PositionDetail;
