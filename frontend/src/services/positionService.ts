import axios from 'axios';

const API_BASE_URL = 'http://localhost:3010';

export interface InterviewStep {
    id: string;
    name: string;
    order: number;
}

export interface Candidate {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    averageScore: number;
    currentStage: string;
}

export const getInterviewFlow = async (positionId: string): Promise<InterviewStep[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/position/${positionId}/interviewflow`);
        return response.data;
    } catch (error: any) {
        throw new Error('Error al obtener el flujo de entrevista: ' + (error.response?.data?.message || error.message));
    }
};

export const getCandidatesByPosition = async (positionId: string): Promise<Candidate[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/position/${positionId}/candidates`);
        return response.data;
    } catch (error: any) {
        throw new Error('Error al obtener los candidatos por posición: ' + (error.response?.data?.message || error.message));
    }
};
