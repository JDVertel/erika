<template>
    <div class="contanier about">
        <br>
        <div class="container mb-3" v-for="(item, index) in DataPagina" :key="index">
            <h4>¿Quienes Somos?</h4>
            <p class="jz">
                {{item.quienessomos}}
            </p>
    
            <br>
            <h4>Mision</h4>
            <p class="jz">
                {{item.mision}}
            </p>
            <br>
            <h4>Vision</h4>
            <p class=" jz">
                {{item.vision}}
            </p>
        </div>
        <br>
        <br>
    </div>
    </template>
    
    <script>
    import {
        mapActions,
        mapState
    } from "vuex";
    export default {
    
        data() {
            return {
                paramsPagina: [{
                    bd: "datos_pagina",
                    parametro: "id_ips",
                    valor: "1",
                    mutation: "setStatePagina",
                }],
            }
        },
        methods: {
            ...mapActions("Auth", ["getDataIPSbyParam"]),
        },
        computed: {
            /*  mapstates */
            ...mapState("Auth", [
                "DataPagina",
            ])
        },
    }
    </script>
    