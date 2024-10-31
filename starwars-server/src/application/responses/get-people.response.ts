export class GetPeopleResponse {
    constructor(
        public readonly nombre: string,
        public readonly altura: string,
        public readonly masa: string,
        public readonly color_de_cabello: string,
        public readonly color_de_piel: string,
        public readonly color_de_ojos: string,
        public readonly anio_de_nacimiento: string,
        public readonly genero: string,
        public readonly planeta_natal: string,
        public readonly peliculas: string[],
        public readonly especies: string[],
        public readonly vehiculos: string[],
        public readonly naves_estelares: string[],
        public readonly creado: string,
        public readonly editado: string,
        public readonly url: string
    ) {}
}