<template>
<div class="accordion custom-header" id="accordionPanelsStayOpenExample">

<!--     <D_consulta />

     <D_observacion />

   <D_inspestatica />

    <D_eval_post />

    <D_insp_dinam />

    <D_esc_visual />

    <D_imagenes /> -->

    <D_exp_fisica />
<!-- 
    <D_sis_muscular />

    <D_analisis />

    <D_diagnostico />

    <D_tratamiento />

    <D_ordenmedica />
    
    <div class="accordion-item">
        <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse14" aria-expanded="false" aria-controls="panelsStayOpen-collapse14">
               
                Guardar Historia clinica
            </button>
        </h2>
        <div id="panelsStayOpen-collapse14" class="accordion-collapse collapse">
            <div class="accordion-body">
                <button type="button" class="btn btn-primary btn-sm">
                    guardar historia clinica
                </button>
            </div>
        </div>
     
    </div> -->
<br>
</div>
</template>

<script>
import D_consulta from "./1_datos_consulta/Dconsult.vue";
import D_observacion from "./2_observacion/Dobs.vue";
import D_inspestatica from "./3_ins_estatica/Dinspestatica.vue";
import D_eval_post from "./4_eval_postural/Deval_post.vue";
import D_insp_dinam from "./5_insp_dinamica/Dinsp_dinam.vue";
import D_esc_visual from "./6_esc_visual/Desc_visual.vue";
import D_imagenes from "./7_imagenes/Dimagenes.vue";
import D_exp_fisica from "./8_exp_fisica/Dexp_fisica.vue";
import D_sis_muscular from "./9_sistema_muscular/sistema_muscular.vue";
import D_analisis from "./10_analisis/D_analisis.vue";
import D_diagnostico from "./11_diagnostico/D_diagnostico.vue";
import D_tratamiento from "./12_tratamiento/Dtratamiento.vue";
import D_ordenmedica from "./13_orden_medica/Dorden_medica.vue";

export default {
    data: () => ({

        /*  */
    }),

    components: {
        D_consulta,
        D_observacion,
        D_inspestatica,
        D_eval_post,
        D_insp_dinam,
        D_esc_visual,
        D_imagenes,
        D_exp_fisica,
        D_sis_muscular,
        D_analisis,
        D_diagnostico,
        D_tratamiento,
        D_ordenmedica,

    }
};
</script>
