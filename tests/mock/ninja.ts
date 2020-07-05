interface Ninja {
        id: number
        name:  string
        birthdate:  string | null
        specie:  string | null
        status: string | null
        sex: string | null
        blood_type: string | null
        ninja_registration: string | null
        academy_grad_age: string | null
        chunin_prom_age: string | null
        unique_traits: string | null
}       

export const ninja_without_relation: Ninja = { 
        "id": 91,
        "name": "Boruto Uzumaki",
        "birthdate": "March 27",
        "specie": "Human",
        "status": null,
        "sex": "Male",
        "blood_type": null,
        "ninja_registration": null,
        "academy_grad_age": null,
        "chunin_prom_age": null,
        "unique_traits": null,
}
