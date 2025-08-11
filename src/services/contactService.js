import authService from './authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ContactService {
  async sendMessage(data) {
    try {
      console.log('Sending contact message to:', `${API_BASE_URL}/contact`);
      console.log('Data:', data);
      
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'fr',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          subject: data.subject,
          message: data.message,
          category: data.category || 'general',
          language: data.language || 'fr',
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      const json = await response.json();
      console.log('Response JSON:', json);
      
      if (!response.ok) {
        const details = json?.details?.map(d => d.message).join(', ');
        throw new Error(details || json.message || 'Failed to send message');
      }

      return json;
    } catch (error) {
      console.error('Error sending contact message:', error);
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      
      // Provide more specific error messages
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Impossible de se connecter au serveur. Vérifiez que le backend est démarré.');
      }
      
      throw error;
    }
  }
}

export const contactService = new ContactService();
export default contactService;
