
        const { jsPDF } = window.jspdf; // Inicializa o jsPDF
        let resultadoIMC = null; // Variável para armazenar o resultado do IMC

        function calcularIMC() {
            const peso = parseFloat(document.getElementById('peso').value);
            const altura = parseFloat(document.getElementById('altura').value);
            const resultadoDiv = document.getElementById('resultado');
            const erroDiv = document.getElementById('erro');

            // Limpar mensagens anteriores
            resultadoDiv.innerHTML = '';
            erroDiv.innerHTML = '';

            // Validar entradas
            if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
                erroDiv.innerHTML = 'Por favor, insira valores válidos para peso e altura.';
                return;
            }

            // Calcular IMC
            const imc = (peso / (altura * altura)).toFixed(2);

            // Determinar a categoria do IMC
            let categoria = '';
            if (imc < 18.5) {
                categoria = 'Abaixo do Peso';
            } else if (imc >= 18.5 && imc < 24.9) {
                categoria = 'Normal';
            } else if (imc >= 25 && imc < 29.9) {
                categoria = 'Sobrepeso';
            } else {
                categoria = 'Obesidade';
            }

            // Armazenar o resultado
            resultadoIMC = { imc, categoria };

            // Exibir o resultado
            resultadoDiv.innerHTML = `
                <h3>Seu IMC é: ${imc}</h3>
                <h4>Categoria: ${categoria}</h4>
            `;
        }

        function imprimirResultado() {
            if (!resultadoIMC) {
                alert('Nenhum resultado disponível para imprimir.');
                return;
            }

            const conteudo = `
                <h1>Resultado do IMC</h1>
                <p><strong>IMC:</strong> ${resultadoIMC.imc}</p>
                <p><strong>Categoria:</strong> ${resultadoIMC.categoria}</p>
            `;

            const janelaImpressao = window.open('', '_blank');
            janelaImpressao.document.write(`
                <html>
                    <head>
                        <title>Imprimir Resultado</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            h1 { color: #007bff; }
                            p { font-size: 18px; }
                        </style>
                    </head>
                    <body>
                        ${conteudo}
                    </body>
                </html>
            `);
            janelaImpressao.document.close();
            janelaImpressao.print();
        }

        function salvarPDF() {
            if (!resultadoIMC) {
                alert('Nenhum resultado disponível para salvar.');
                return;
            }

            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.setTextColor(0, 0, 255); // Azul
            doc.text("Resultado do IMC", 10, 20);
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0); // Preto
            doc.text(`IMC: ${resultadoIMC.imc}`, 10, 40);
            doc.text(`Categoria: ${resultadoIMC.categoria}`, 10, 50);

            // Salvar o PDF
            doc.save('resultado_imc.pdf');
        }
 