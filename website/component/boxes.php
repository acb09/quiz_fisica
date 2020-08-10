<?php
$estatisticas = json_decode(file_get_contents("register.json"));
if ($estatisticas->media_geral_acertos)
    $media_acertos = $estatisticas->media_geral_acertos / $estatisticas->n_usuarios_cadastrados;
if ($estatisticas->media_geral_erros)
    $media_erros = $estatisticas->media_geral_erros / $estatisticas->n_usuarios_cadastrados;
?>
<!-- Info boxes -->
<div class="row">
    <!-- /.col -->
    <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="info-box">
            <span class="info-box-icon bg-yellow"><?= $estatisticas->n_usuarios_cadastrados ?></span>

            <div class="info-box-content">
                <span class="info-box-text">
                    <h2>Total de alunos</h2>
                </span>
            </div>
            <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
    </div>
    <!-- /.col -->

    <!-- fix for small devices only -->
    <div class="clearfix visible-sm-block"></div>

    <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="info-box">
            <span class="info-box-icon bg-green"><?= $estatisticas->total_alunos_aprovados ?></span>

            <div class="info-box-content">
                <span class="info-box-text">
                    <h2>Alunos aprovados</h2>
                </span>
            </div>
            <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
    </div>

    <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="info-box">
            <span class="info-box-icon bg-red"><?= $estatisticas->total_alunos_reprovados ?></span>

            <div class="info-box-content">
                <span class="info-box-text">
                    <h2>Alunos reprovados</h2>
                </span>
            </div>
            <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
    </div>
    <!-- /.row -->