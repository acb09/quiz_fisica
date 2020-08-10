<footer class="main-footer">
    <div class="pull-right hidden-xs">
        <b>Version</b> 2.4.0
    </div>
    <strong>Copyright &copy; 2014-2016 <a href="https://adminlte.io">Almsaeed Studio</a>.</strong> All rights
    reserved.
</footer>

<!-- jQuery 3 -->
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<!-- Bootstrap 3.3.7 -->
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
<!-- FastClick -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/fastclick/1.0.6/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/2.4.18/js/adminlte.min.js"></script>
<!-- Sparkline -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-sparklines/2.1.2/jquery.sparkline.js"></script>
<!-- jvectormap  -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jvectormap/2.0.5/jquery-jvectormap.js"></script>
<!-- SlimScroll -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jQuery-slimScroll/1.3.8/jquery.slimscroll.js"></script>
<!-- ChartJS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.min.js"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.0.5/js/pages/dashboard2.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.0.5/js/demo.min.js"></script>

<script>
    window.onload = () => {
        const canvas_percentual = document.querySelector("#percentual");
        const ctx_percentual = canvas_percentual.getContext('2d');
        const canvas_line_bar = document.querySelector("#line_bar");
        const ctx_line_bar = canvas_line_bar.getContext('2d');

        const line_bar = new Chart(ctx_line_bar, {
            type: 'bar',
            data: {
                labels: [<?php foreach ($estatisticas->estatisticas_questoes as $key => $questao) echo $key . ',' ?>],
                datasets: [{
                    label: 'Nº erros',
                    backgroundColor: [
                        <?php
                        foreach ($estatisticas->estatisticas_questoes as $questao)
                            echo "'rgb(".rand(0, 255).", ".rand(0, 255).", ".rand(0, 255).")'" . ',';
                        ?>
                    ],
                    borderColor: 'rgb(250,250,250)',
                    data: [<?php foreach ($estatisticas->estatisticas_questoes as $questao) echo $questao . ',' ?>]
                }]
            },
            options: []
        });

        const percentual = new Chart(ctx_percentual, {
            type: 'doughnut',
            data: {
                labels: ['Acertos', 'Erros'],
                datasets: [{
                    label: 'Percentual',
                    backgroundColor: ['rgb(100, 200, 100)', 'rgb(250, 100, 100)'],
                    borderColor: 'rgb(250,250,250)',
                    data: [<?= number_format($media_acertos, 2)  ?>, <?= number_format($media_erros, 2) ?>]
                }]
            },
            options: []
        });
    }
</script>

</body>

</html>