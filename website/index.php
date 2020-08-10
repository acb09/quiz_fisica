<?php require_once "component/head.php"; ?>
<?php $perguntas = json_decode(file_get_contents('Perguntas.json')); ?>
<?php $file_alunos = json_decode(file_get_contents('users.json')); ?>
<?php $estatisticas = json_decode(file_get_contents("register.json")); ?>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">

    <!-- Main content -->
    <section class="content mt-3">
        <?php
        if ($estatisticas->media_geral_acertos) {
            $media_acertos = floatval($estatisticas->media_geral_acertos) / $estatisticas->n_usuarios_cadastrados;
        }
        else
            $media_acertos = 0;

        if ($estatisticas->media_geral_erros)
            $media_erros = floatval($estatisticas->media_geral_erros) / $estatisticas->n_usuarios_cadastrados;
        else
            $media_erros = 0;
        ?>
        <!-- Info boxes -->
        <div class="row">
            <!-- /.col -->
            <div class="col-md-4 col-sm-12 col-xs-12">
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

            <div class="col-md-4 col-sm-12 col-xs-12">
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

            <div class="col-md-4 col-sm-12 col-xs-12">
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


        </div>



        <div class="row">

            <div class="col-md-12 col-sm-12 col-xs-12">
                <?php
                $alunos = $file_alunos;
                ?>
                <table class="table table-bordered bg-white">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Questões erradas</th>
                            <th scope="col">Total de erros</th>
                            <th scope="col">Percentual acertos</th>
                            <th scope="col">Percentual erros</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($alunos as $aluno) : ?>
                            <?php   
                              $aluno->percentual_acertos =  floor( 100 - ($aluno->total_erros / count($perguntas) * 100) );
                              $aluno->percentual_erros =  100 - $aluno->percentual_acertos;
                            ?>
                            <tr>
                                <th scope="row"><?= $aluno->nome ?></th>
                                <td>
                                    <?= (empty($aluno->questoes_erradas)) ? 'Conduta impecável!' : '' ?>
                                    <?php foreach ($aluno->questoes_erradas as $q) : ?>
                                        <a href="#<?= $q ?>"><?= $q ?> </a>
                                    <?php endforeach; ?>
                                </td>
                                <td><?= $aluno->total_erros ?>/<?= count($perguntas) ?></td>
                                <td style="color: <?= ($aluno->percentual_acertos >=  60) ? 'green' : 'red' ?>"><?= number_format($aluno->percentual_acertos, 0) ?> %</td>
                                <td><?= number_format($aluno->percentual_erros, 0) ?> %</td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>

        </div>





        <div class="row">

            <div class="col-md-6 col-sm-12 col-xs-12">

                <?php if (isset($media_acertos) && isset($media_erros)) : ?>
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="info-box">
                            <br>
                            <canvas id="line_bar"></canvas>
                            </span>
                            <!-- /.info-box -->
                            <br>
                        </div>
                    </div>
                <?php endif; ?>

            </div>


            <div class="col-md-6 col-sm-12 col-xs-12">

                <?php if (isset($media_acertos) && isset($media_erros)) : ?>
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="info-box">
                            <br>
                            <canvas id="percentual" width="50"></canvas>
                            </span>
                            <!-- /.info-box -->
                            <br>
                        </div>
                    </div>
                <?php endif; ?>

            </div>

        </div>





        <div class="row">

            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="info-box p-4">
                    <table class="table table-bordered bg-white">
                        <tbody>
                            <?php foreach ($perguntas as $pergunta) : ?>
                                <tr id="<?= $pergunta->id ?>">
                                    <td><?= $pergunta->id ?></td>
                                    <td colspal="200">
                                        <?= $pergunta->pergunta ?>
                                        <br>
                                        <b>
                                            <?php foreach ($pergunta->alternativas as $alternativa) : ?>
                                                (<?= $alternativa ?>)
                                                <br>
                                            <?php endforeach; ?>
                                            <b>
                                    </td>
                                    <td>Resposta Correta: <b><?= $pergunta->letraRespostaCorreta ?></b></td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    </section>
    <!-- /.content -->
</div>
<!-- /.content-wrapper -->
<?php require_once "component/footer.php"; ?>