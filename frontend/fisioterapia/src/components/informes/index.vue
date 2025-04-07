<template>
<div>
    <br>
    <h4>Informes FisioApp</h4>
    <br>

    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Servicios</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Clases</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Tienda</button>
        </li>
        <!--         <li class="nav-item" role="presentation">
              <button class="nav-link" id="disabled-tab" data-bs-toggle="tab" data-bs-target="#disabled-tab-pane" type="button" role="tab" aria-controls="disabled-tab-pane" aria-selected="false" disabled>Disabled</button>
            </li> -->
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
            <!-- -----------------------------------------SERVICIOS--------------------------------------------------------- -->
            <div class="container-fluid mt-2">
                <div class="row">
                    <div class="col-3">
                        <div class="mb-3">
                            <label for="fechainicio" class="form-label">Fecha Inicio</label>
                            <input type="date" class="form-control" id="fechainicio">
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="mb-3">
                            <label for="fechafin" class="form-label">Fecha fin</label>
                            <input type="date" class="form-control" id="fechafin">
                        </div>
                    </div>
                    <div class="col-3"><button type="button" class="btn btn-primary btn-sm">Generar</button></div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-4"> <strong>Servicios Facturados</strong>
                        <br>
                        <table class="table table-sm">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>First</th>
                                <th>Last</th>
                                <th>Handle</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                              <tr>
                                <th>2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                              </tr>
                              <tr>
                                 <th>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                    <div class="col-12 col-md-4"> <strong>Servicios Realizados</strong>
                        <br>
                        <table class="table table-sm">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>First</th>
                                <th>Last</th>
                                <th>Handle</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                              <tr>
                                <th>2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                              </tr>
                              <tr>
                                 <th>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                    <div class="col-12 col-md-4"> <strong>Relacion Servicios X Profesional</strong>
                        <br>
                        <table class="table table-sm">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>First</th>
                                <th>Last</th>
                                <th>Handle</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                              <tr>
                                <th>2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                              </tr>
                              <tr>
                                 <th>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                </div>
            </div>

        </div>
        <!-- ----------------------------------------------CLASES-------------------------------------------------------- -->
        <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
            <div class="container-flid mt-2">
                <div class="row">
                   <div class="col-3">
                        <div class="mb-3">
                            <label for="fechainicio" class="form-label">Fecha Inicio</label>
                            <input type="date" class="form-control" id="fechainicio">
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="mb-3">
                            <label for="fechafin" class="form-label">Fecha fin</label>
                            <input type="date" class="form-control" id="fechafin">
                        </div>
                    </div>
                    <div class="col-3"><button type="button" class="btn btn-primary btn-sm">Generar</button></div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-4"> <strong>Clases Facturadas</strong>
                        <br>
                        <table class="table table-sm">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>First</th>
                                <th>Last</th>
                                <th>Handle</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                              <tr>
                                <th>2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                              </tr>
                              <tr>
                                 <th>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                    <div class="col-12 col-md-4"> <strong>Clases Realizadas</strong>
                        <br>
                        <table class="table table-sm">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>First</th>
                                <th>Last</th>
                                <th>Handle</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                              <tr>
                                <th>2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                              </tr>
                              <tr>
                                 <th>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                    <div class="col-12 col-md-4"> <strong>Relacion Clases X Profesional</strong>
                        <br>
                        <table class="table table-sm">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>First</th>
                                <th>Last</th>
                                <th>Handle</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                              <tr>
                                <th>2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                              </tr>
                              <tr>
                                 <th>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- ------------------------------------------TIENDA----------------------------------------------->
        <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
            <div class="container-fluid mt-2">
                <div class="row">
                    <div class="col-3">
                        <div class="mb-3">
                            <label for="fechainicio" class="form-label">Fecha Inicio</label>
                            <input type="date" class="form-control" id="fechainicio">
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="mb-3">
                            <label for="fechafin" class="form-label">Fecha fin</label>
                            <input type="date" class="form-control" id="fechafin">
                        </div>
                    </div>
                    <div class="col-3"><button type="button" class="btn btn-primary btn-sm">Generar</button></div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-4"> <strong>Productos Facturados</strong>
                        <br>
                        <table class="table table-sm">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>First</th>
                                <th>Last</th>
                                <th>Handle</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                              <tr>
                                <th>2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                              </tr>
                              <tr>
                                 <th>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                    <div class="col-12 col-md-4"> <strong>Productos Agregados</strong>
                        <br>
                        <table class="table table-sm">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>First</th>
                                <th>Last</th>
                                <th>Handle</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                              <tr>
                                <th>2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                              </tr>
                              <tr>
                                 <th>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                    <div class="col-12 col-md-4"> <strong>Inventario actual</strong>
                        <br>
                        <table class="table table-sm">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>First</th>
                                <th>Last</th>
                                <th>Handle</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                              <tr>
                                <th>2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                              </tr>
                              <tr>
                                 <th>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                </div>
            </div>
        </div>
        <!--       <div class="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabindex="0">...</div> -->
    </div>

</div>
</template>

<script>
export default {

}
</script>

<style lang="">

</style>
