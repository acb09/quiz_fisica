nomeEstaVazio = nome => nome === null;
naoPossuiSobrenome = nome => nome ? nome.trim().split(" ").length < 2 : false;

validarNome = nome => {
    if (nomeEstaVazio(nome)) return 1;
    if (naoPossuiSobrenome(nome)) return 2;

    return false;
};

export default validarNome;
