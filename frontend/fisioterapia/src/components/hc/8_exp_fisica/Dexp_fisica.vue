<!-- hc8_expfisica -->
<template>
  <div class="accordion-item">
    <h2 class="accordion-header d-flex justify-content-between">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpen-collapse8"
        aria-expanded="false"
        aria-controls="panelsStayOpen-collapse8"
      >
        Exploracion Fisica ok
      </button>
      <!--  -->
      <!--         <button class="btn btn-outline-primary btn-sm">save</button> -->
      <!--  -->
    </h2>
    <div id="panelsStayOpen-collapse8" class="accordion-collapse collapse">
      <div class="accordion-body">
        <h6>Inspección y Palpación</h6>
        <p>
          Evaluación por aparatos y sistemas: Comparando con el lado colateral
        </p>
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              class="nav-link active"
              id="nav-soseo-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-soseo"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="false"
            >
              Sistema Oseo
            </button>

            <button
              class="nav-link"
              id="nav-msuperior-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-msuperior"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              Valoracion Rangos de Movimientos (M Superior)
            </button>

            <button
              class="nav-link"
              id="nav-minferior-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-minferior"
              type="button"
              role="tab"
              aria-controls="nav-contact"
              aria-selected="true"
            >
              Valoracion Rangos de Movimientos (M Inferior)
            </button>
          </div>
        </nav>
        <!--  -->
        <div class="tab-content" id="nav-tabContent">
          <div
            class="tab-pane fade show active"
            id="nav-soseo"
            role="tabpanel"
            tabindex="0"
          >
            <p>Seleccione y agregue hallazgos</p>

            <div class="row">
              <div class="col-12 col-md-6">


                <select
                  class="form-select form-select-sm"
                  aria-label="Small select example"
                  v-model="tipoclase"
                  @change="buscardata(tipoclase, data_exp, 'detalle')"
                >
                  <option selected value="0">--seleccione Clase--</option>
                  <option
                    v-for="(item, index) in data_exp"
                    :key="index"
                    :value="item.clase"
                  >
                    {{ item.clase }}
                  </option>
                </select>



                <select
                  class="form-select form-select-sm"
                  aria-label="Small select example"
                  v-model="tipomusculo"
                >
                  <option value="0" selected>
                    --Seleccione Tipo musculo--
                  </option>
                  <option v-for="item in datosC" :key="item.id">
                    {{ item }}
                  </option>
                </select>

                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label"
                    >Detalle</label
                  >
                  <textarea
                    class="form-control form-control-sm"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    v-model="detalle"
                  ></textarea>
                </div>

                <div class="row">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    v-if="tipoclase !='0' && tipomusculo !='0' && detalle !=''"
                    @click="
                      AddAntec('Oseo', tipoclase, tipomusculo, detalle)
                    "
                  >
                    agregar
                  </button>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="card">
                  <div class="card-header">Registro</div>
                  <table class="table table-sm">
                    <thead>
                      <tr>
                        <th>Sistema</th>
                        <th>Clase</th>
                        <th>Musculo</th>
                        <th>Detalle</th>
                        <th>Opc</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in NewAntec" :key="index">
                        <td>{{ item.diag_sistema }}</td>
                        <td>{{ item.diag_clase }}</td>
                        <td>{{ item.diag_musculo }}</td>
                        <td>{{ item.diag_detalle }}</td>
                        <td>
                          <button
                            class="btn btn-sm btn-danger"
                            @click="eliminaritem(index)"
                          >
                            <i class="bi bi-trash-fill"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="nav-msuperior"
            role="tabpanel"
            tabindex="0"
          >
            <div class="row">
              <h5>Valoracion de rangos de Mov (Miembro Superior)</h5>

              <div class="col-12 col-md-4">
                <h6>RAQUIS CERVICAL</h6>
                <table class="table table-sm table-success">
                  <thead>
                    <tr>
                      <th>Mov</th>
                      <th>Izq</th>
                      <th>Der</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Flexión</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="rangosMovimientos.raquisCervical.flexionIzq"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="rangosMovimientos.raquisCervical.flexionDer"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Extensión</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="
                            rangosMovimientos.raquisCervical.extensionIzq
                          "
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="
                            rangosMovimientos.raquisCervical.extensionDer
                          "
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Inclinación lat der</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="
                            rangosMovimientos.raquisCervical.inclinacionLatIzq
                          "
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="
                            rangosMovimientos.raquisCervical.inclinacionLatDer
                          "
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Rotación Izq</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="rangosMovimientos.raquisCervical.rotacionIzq"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="rangosMovimientos.raquisCervical.rotacionDer"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-12 col-md-4">
                <h6>RAQUIS DORSOLUMBAR</h6>
                <table class="table table-sm table-info">
                  <thead>
                    <tr>
                      <th>Mov</th>
                      <th>Izq</th>
                      <th>Der</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Flexión</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Extención</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Inclinación lateral der</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Inclinación lateral izq</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Rotación Izq</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Rotación Der</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-12 col-md-4">
                <h6>HOMBRO</h6>
                <table class="table table-sm table-warning">
                  <thead>
                    <tr>
                      <th>Mov</th>
                      <th>Izq</th>
                      <th>Der</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Flexión</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Extención</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Abduccion</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Aduccion</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Rotación Interna</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Rotación Externa</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-12 col-md-4">
                <h6>CODO</h6>
                <table class="table table-sm table-primary">
                  <thead>
                    <tr>
                      <th>Mov</th>
                      <th>Izq</th>
                      <th>Der</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Flexión</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Extención</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Pronación</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Supinación</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-12 col-md-4">
                <h6>MUÑECA</h6>
                <table class="table table-sm table-danger">
                  <thead>
                    <tr>
                      <th>Mov</th>
                      <th>Izq</th>
                      <th>Der</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Flexión</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Extención</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Desviacion radial</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Desviacion cubital</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!--  -->
          <div
            class="tab-pane fade"
            id="nav-minferior"
            role="tabpanel"
            tabindex="0"
          >
            <h5>Valoracion de rangos de Mov (Miembro Inferior)</h5>
            <div class="row">
              <div class="col-12 col-md-3">
                <h6>CADERA</h6>
                <table class="table table-sm table-secondary">
                  <thead>
                    <tr>
                      <th>Mov</th>
                      <th>Izq</th>
                      <th>Der</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Flexión</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="rangosMovimientos.cadera.flexionIzq"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="rangosMovimientos.cadera.flexionDer"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Extensión</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="rangosMovimientos.cadera.extensionIzq"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="rangosMovimientos.cadera.extensionDer"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Abducción</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="rangosMovimientos.cadera.abduccionIzq"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="rangosMovimientos.cadera.abduccionDer"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Aducción</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="rangosMovimientos.cadera.aduccionIzq"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="rangosMovimientos.cadera.aduccionDer"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Rotación Interna</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="rangosMovimientos.cadera.rotacionInternaIzq"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="rangosMovimientos.cadera.rotacionInternaDer"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Rotación Externa</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="rangosMovimientos.cadera.rotacionExternaIzq"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="rangosMovimientos.cadera.rotacionExternaDer"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-12 col-md-3">
                <h6>RODILLA</h6>
                <table class="table table-sm table-danger">
                  <thead>
                    <tr>
                      <th>Mov</th>
                      <th>Izq</th>
                      <th>Der</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Flexión</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Extención</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-12 col-md-3">
                <h6>TOBILLO</h6>
                <table class="table table-sm table-warning">
                  <thead>
                    <tr>
                      <th>Mov</th>
                      <th>Izq</th>
                      <th>Der</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Flexión plantar</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Flexión dorsal</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-12 col-md-3">
                <h6>ART.SUBASTRAGALINA</h6>
                <table class="table table-sm table-success">
                  <thead>
                    <tr>
                      <th>Mov</th>
                      <th>Izq</th>
                      <th>Der</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Inversion</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Eversión</td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          id="exampleFormControlInput1"
                          placeholder="DATA"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div class="container">
          <textarea
            class="form-control form-control-sm"
            id="exampleFormControlTextarea1"
            placeholder="Observaciones"
            rows="3"
            v-model="observaciones"
          ></textarea>
        </div>

        <button class="btn btn-warning mt-3" @click="guardarInfo">
          + Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { exp_fisica } from "./../../../firebase/bd.js";
import {
  BuscarDetalles,
  BuscarExpFisicaDetalleNombre,
} from "./../../backend/rutinas.js";

export default {
  data: () => ({
    data_exp: exp_fisica,
    tipoclase: "0",
    tipoevaluacion: "0",
    tipomusculo: "0",
    datosC: "",
    detalle: "",
    observaciones: "",
    rangosMovimientos: {
      raquisCervical: {
        flexionIzq: "",
        flexionDer: "",
        extensionIzq: "",
        extensionDer: "",
        inclinacionLatDer: "",
        inclinacionLatIzq: "",
        rotacionIzq: "",
        rotacionDer: "",
      },
      raquisDorsolumbar: {
        flexionIzq: "",
        flexionDer: "",
        extensionIzq: "",
        extensionDer: "",
        inclinacionLatDer: "",
        inclinacionLatIzq: "",
        rotacionIzq: "",
        rotacionDer: "",
      },
      hombro: {
        flexionIzq: "",
        flexionDer: "",
        extensionIzq: "",
        extensionDer: "",
        abduccionIzq: "",
        abduccionDer: "",
        aduccionIzq: "",
        aduccionDer: "",
        rotacionInternaIzq: "",
        rotacionInternaDer: "",
        rotacionExternaIzq: "",
        rotacionExternaDer: "",
      },
      codo: {
        flexionIzq: "",
        flexionDer: "",
        extensionIzq: "",
        extensionDer: "",
        pronacionIzq: "",
        pronacionDer: "",
        supinacionIzq: "",
        supinacionDer: "",
      },
      muneca: {
        flexionIzq: "",
        flexionDer: "",
        extensionIzq: "",
        extensionDer: "",
        desviacionRadialIzq: "",
        desviacionRadialDer: "",
        desviacionCubitalIzq: "",
        desviacionCubitalDer: "",
      },
      cadera: {
        flexionIzq: "",
        flexionDer: "",
        extensionIzq: "",
        extensionDer: "",
        abduccionIzq: "",
        abduccionDer: "",
        aduccionIzq: "",
        aduccionDer: "",
        rotacionInternaIzq: "",
        rotacionInternaDer: "",
        rotacionExternaIzq: "",
        rotacionExternaDer: "",
      },
      rodilla: {
        flexionIzq: "",
        flexionDer: "",
        extensionIzq: "",
        extensionDer: "",
      },
      tobillo: {
        flexionPlantarIzq: "",
        flexionPlantarDer: "",
        flexionDorsalIzq: "",
        flexionDorsalDer: "",
      },
      artSubastragalina: {
        inversionIzq: "",
        inversionDer: "",
        eversionIzq: "",
        eversionDer: "",
      },
    },
    NewAntec: [],
    ArraySaveConsulta: [],
  }),
  methods: {
    buscardata(x, y, z) {
      this.datosC = BuscarExpFisicaDetalleNombre(x, y, z);
    },

    AddAntec(sistema, clase, musculo, detalle) {
      let item = {
        diag_sistema: sistema,
        diag_clase: clase,
        diag_musculo: musculo,
        diag_detalle: detalle,
      };
      this.NewAntec = [...this.NewAntec, item];
      console.log(this.NewAntec);
      this.limpiarcampos();
    },

    
    eliminaritem(index) {
      console.log(index);
      this.NewAntec.splice(index, 1);
    },
    limpiarcampos() {
      this.tipoclase = "0";
      this.detalle= "";
      this.tipomusculo = "0";

     
    },

    guardarInfo() {
      this.ArraySaveConsulta = [];
      const datos = {
        tipoevaluacion: this.tipoevaluacion,
        tipomusculo: this.tipomusculo,
        detalle: this.detalle,
        observaciones: this.observaciones,
        rangosMovimientos: this.rangosMovimientos,
      };

      console.log("Array de Antecedentes:", this.NewAntec);
    },
  },
};
</script>
