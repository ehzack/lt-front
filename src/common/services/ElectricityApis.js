import { instance } from "../Axios";



// loading alarmes api
export const AlarmeGeneratorApi = () => {
    return instance
    .get("/generator_alarme")
    .then((response) => {
        return response
        })
};


// loading gasoline api
export const GasolineApi = () => {
    return instance
    .get("/gasoline")
    .then((response) => {
        return response
    })
};

// loading Normale Source api
export const NormaleSourceApi = () => {
    return instance
        .get("/normal_source")
        .then((response) => {
            return response
        })
};


// loading electricity api
export const ElectricityApi = () => {
    return instance
        .get("/electricity")
        .then((response) => {
            return response
        })
};