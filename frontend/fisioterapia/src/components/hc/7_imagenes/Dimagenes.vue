<!-- hc7_pimagenexamencomp -->
<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpen-collapse7"
        aria-expanded="false"
        aria-controls="panelsStayOpen-collapse7"
      >
        Pruebas de Imagen o Examenes Complementarios ok
      </button>
    </h2>
    <div id="panelsStayOpen-collapse7" class="accordion-collapse collapse">
      <div class="accordion-body">
        <div class="row">
          <div class="col-md-12">
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  class="nav-link active"
                  id="nav-b-radiografia"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-radiografia"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Radiografia
                </button>
                <button
                  class="nav-link"
                  id="nav-b-ecografia"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-ecografia"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Ecografia
                </button>
                <button
                  class="nav-link"
                  id="nav-b-resonancia"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-resonancia"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Resonancia
                </button>
                <button
                  class="nav-link"
                  id="nav-b-tag"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-tag"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  TAG
                </button>
                <button
                  class="nav-link"
                  id="nav-b-otros"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-otros"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Otros
                </button>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
              <div
                class="tab-pane fade show active"
                id="nav-radiografia"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
                tabindex="0"
              >
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label"
                    >Breve descripcion de la Radiografia</label
                  >
                  <textarea
                    class="form-control textarea"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    v-model="radiografia"
                  ></textarea>
                </div>
                <div class="container">
                  <div class="mb-3">
                    <label for="formFileMultiple" class="form-label"
                      >Seleccione radiografia para adjuntar</label
                    >
                    <input
                      class="form-control"
                      type="file"
                      id="formFileMultiple_radiografia"
                      multiple
                      @change="handleFileUpload"
                    />
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="nav-ecografia"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
                tabindex="0"
              >
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label"
                    >Breve descripcion de la Ecografia</label
                  >
                  <textarea
                    class="form-control textarea"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    v-model="ecografia"
                  ></textarea>
                </div>
                <div class="container">
                  <div class="mb-3">
                    <label for="formFileMultiple" class="form-label"
                      >Seleccione Ecografia para adjuntar</label
                    >
                    <input
                      class="form-control"
                      type="file"
                      id="formFileMultiple_ecografia"
                      multiple
                      @change="handleFileUpload"
                    />
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="nav-resonancia"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
                tabindex="0"
              >
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label"
                    >Breve descripcion de la Resonancia</label
                  >
                  <textarea
                    class="form-control textarea"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    v-model="resonancia"
                  ></textarea>
                </div>
                <div class="container">
                  <div class="mb-3">
                    <label for="formFileMultiple" class="form-label"
                      >Seleccione Resonancia para adjuntar</label
                    >
                    <input
                      class="form-control"
                      type="file"
                      id="formFileMultiple_resonancia"
                      multiple
                      @change="handleFileUpload"
                    />
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="nav-tag"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
                tabindex="0"
              >
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label"
                    >Breve descripcion del TAG</label
                  >
                  <textarea
                    class="form-control textarea"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    v-model="tag"
                  ></textarea>
                </div>
                <div class="container">
                  <div class="mb-3">
                    <label for="formFileMultiple" class="form-label"
                      >Seleccione TAG para adjuntar</label
                    >
                    <input
                      class="form-control"
                      type="file"
                      id="formFileMultiple_tag"
                      multiple
                      @change="handleFileUpload"
                    />
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="nav-otros"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
                tabindex="0"
              >
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label"
                    >Breve descripcion de Otros</label
                  >
                  <textarea
                    class="form-control textarea"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    v-model="otros"
                  ></textarea>
                </div>
                <div class="container">
                  <div class="mb-3">
                    <label for="formFileMultiple_otrostipos" class="form-label"
                      >Seleccione Otros archivos para adjuntar</label
                    >
                    <input
                      class="form-control"
                      type="file"
                      id="formFileMultiple"
                      multiple
                      @change="handleFileUpload"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-12">

          </div>
        </div>
        <button class="btn btn-warning mt-3" @click="guardarInfo">
          + Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radiografia: "",
      ecografia: "",
      resonancia: "",
      tag: "",
      otros: "",
      archivos: [],
      NewAntec: [],
      ArraySaveConsulta: [],
    };
  },
  methods: {
    handleFileUpload(event) {
      this.archivos = Array.from(event.target.files);
    },
    AddAntec(tipo, enf, detalle) {
      let item = {
        tipo: tipo,
        enfermedad: enf,
        detalleenf: detalle,
      };
      this.NewAntec = [...this.NewAntec, item];
    },
    guardarInfo() {
      this.ArraySaveConsulta = [];
      const datos = {
        radiografia: this.radiografia,
        ecografia: this.ecografia,
        resonancia: this.resonancia,
        tag: this.tag,
        otros: this.otros,
        archivos: this.archivos.map((file) => file.name),
      };

      for (let propiedad in datos) {
        if (datos[propiedad]) {
          let element = {
            [propiedad]: datos[propiedad],
          };
          this.ArraySaveConsulta = {
            ...this.ArraySaveConsulta,
            ...element,
          };
        }
      }

      console.log("Datos guardados:", this.ArraySaveConsulta);
      console.log("Array de Antecedentes:", this.NewAntec);
    },
  },
};
</script>
