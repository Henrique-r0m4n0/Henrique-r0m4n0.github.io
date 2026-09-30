document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      nome: document.getElementById('nome').value.trim(),
      email: document.getElementById('email').value.trim(),
      mensagem: document.getElementById('mensagem').value.trim()
    };

    statusMsg.textContent = 'Enviando...';
    statusMsg.style.color = '#2563eb';

    try {
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        statusMsg.textContent = result.message;
        statusMsg.style.color = '#16a34a';
        form.reset();
      } else {
        throw new Error(result.error || 'Erro ao enviar.');
      }
    } catch (err) {
      statusMsg.textContent = err.message || 'Falha na conexão com o servidor.';
      statusMsg.style.color = '#dc2626';
    }
  });
});