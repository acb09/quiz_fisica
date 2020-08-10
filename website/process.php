<?php

$payload = json_decode(file_get_contents("php://input"));
$estatisticas = json_decode(file_get_contents("register.json"));
$array_users = json_decode(file_get_contents('users.json')) ?? [];
if (!$payload || !$estatisticas) {
    echo "Payload or estatisticas invalid!";
    exit;
}

// Não registra o usuário se já existir
foreach ($array_users as $user)
    if ($user->imei === $payload->IMEI[0])
        exit;

if ($estatisticas->estatisticas_questoes === NULL)
    for ($i = 0; $i < $perguntas; $i++)
        $estatisticas->estatisticas_questoes[] = [$i] = 0;

$numeros_erros = count($payload->questoesqueerrou);

$resultado = [];
$resultado["imei"] = $payload->IMEI[0];
$resultado["nome"] = $payload->nome;
$resultado["questoes_erradas"] = $payload->questoesqueerrou;
$resultado["total_erros"] = $numeros_erros;
$resultado["percentual_erros"] = $numeros_erros / $payload->maxPerguntas * 100;
$resultado["percentual_acertos"] = 100 - $resultado["percentual_erros"];
$resultado["estatisticas_questoes"] = [];

$estatisticas->n_usuarios_cadastrados++;
$estatisticas->media_geral_acertos += $resultado["percentual_acertos"];
$estatisticas->media_geral_erros += $resultado["percentual_erros"];

foreach ($resultado["questoes_erradas"] as $questao)
    $estatisticas->estatisticas_questoes->$questao++;

($resultado["percentual_acertos"] > 60) ? $estatisticas->total_alunos_aprovados++ : $estatisticas->total_alunos_reprovados++;

$array_users[] = $resultado;

file_put_contents('register.json', json_encode($estatisticas));
file_put_contents('users.json', json_encode($array_users));

echo json_encode($estatisticas);