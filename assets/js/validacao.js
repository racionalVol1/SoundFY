export function valida(input){
    const tipoDeInput = input.dataset.tipo   
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.mensagem-erro').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.mensagem-erro').innerHTML = monstraMenagemDeErro(tipoDeInput, input)
     }

}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio'
    },
    email: {
        valueMissing: 'O campo email não pode estar vazio',
        typeMismatch: 'O email digitado não é válido'
    },
    senha: {
        valueMissing: 'O campo senha não pode estar vazio',
        patternMismatch: 'A senha deve conter entre 6 a 12 caracteres, pelo menos um número, uma letra maiúscula e uma minúscula'
    },
    dataNascimento: {
        valueMissing: 'O campo data de nascimento não pode estar vazio',
        customError: 'Você deve ser maior que 18 anos para prosseguir'
    }
}


const validadores = {
    dataNascimento: input => validaDataNascimento(input)
}

const dataNascimento = document.querySelector('#date');

dataNascimento.addEventListener('blur', (evento) => {
    validaDataNascimento(evento.target);
});

function mostraMensagemDeErro(tipoDeInput, input){
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]){
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })

    return mensagem
}

function validaDataNascimento(input){
    const dataRecebida = new Date(input.value);
    let mensagem = "";

    if(!maiorQue18(dataRecebida)) {
    mensagem = 'Você deve ser maior de 18 anos para prosseguir';
    }

    input.setCustomValidity(mensagem)
}

function maiorQue18(data) {
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

   return dataMais18 <= dataAtual;


}