XxXfrom Flask import Flask, render_template, request, jsonify

app = Flask(__name__, static_folder='.', template_folder='.')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/contato', methods=['POST'])
def processar_contato():
    data = request.get_json()
    
    nome = data.get('nome')
    email = data.get('email')
    mensagem = data.get('mensagem')

    if not nome or not email or not mensagem:
        return jsonify({'error': 'Todos os campos são obrigatórios.'}), 400

    # Lógica de recebimento (salvar em banco de dados ou enviar e-mail)
    print(f"Novo contato: {nome} <{email}> - {mensagem}")

    return jsonify({'message': 'Mensagem enviada com sucesso!'}), 200

if __name__ == '__main__':
    # Execute no terminal: pip install flask
    app.run(debug=True, port=5000)