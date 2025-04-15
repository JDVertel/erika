<template>
<div class="accordion custom-header" id="accordionPanelsStayOpenExample">
    <D_consulta ref="G_consulta" />

    <D_observacion ref="G_observacion" />

    <D_inspestatica ref="G_inspestatica" />

    <D_eval_post ref="G_eval_post" />

    <D_insp_dinam ref="G_insp_dinam" />

    <D_esc_visual ref="G_esc_visual" />

    <D_imagenes ref="G_imagenes" />

    <D_exp_fisica ref="G_exp_fisica" />

    <D_sis_muscular ref="G_sis_muscular" />

    <D_analisis ref="G_analisis" />

    <D_diagnostico ref="G_diagnostico" />

    <D_tratamiento ref="G_tratamiento" />

    <D_ordenmedica ref="G_ordenmedica" />

    <br>
    <div class="row"> 
     
        <button type="button" class="btn btn-warning btn-sm mb-3" @click="guardarTodo">
           
            <i class="bi bi-floppy2"></i> Guardar historia clinica
        </button>
    </div>

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

    },
    methods: {
        async guardarTodo() {
            console.log("Ejecutando todo");

            try {
                await this.$refs.G_consulta.guardarInfo1();
                await this.$refs.G_observacion.guardarInfo2();
                await this.$refs.G_inspestatica.guardarInfo3();
                await this.$refs.G_eval_post.guardarInfo4();
                await this.$refs.G_insp_dinam.guardarInfo5();
                await this.$refs.G_esc_visual.guardarInfo6();
                await this.$refs.G_imagenes.uploadImage_p7();
                await this.$refs.G_exp_fisica.guardarInfo8();
                await this.$refs.G_sis_muscular.guardarInfo9();
                await this.$refs.G_analisis.guardarInfo10();
                await this.$refs.G_diagnostico.guardarInfo11();
                await this.$refs.G_tratamiento.guardarInfo12();
                await this.$refs.G_ordenmedica.guardarInfo13();
            } catch (error) {
                console.error("Error al guardar información:", error);
            }
        },
    }
};
</script>
