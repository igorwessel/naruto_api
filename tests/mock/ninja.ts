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
        "id": 812,
        "name": "Naruto Uzumaki",
        "birthdate": "October 10",
        "specie": "Human",
        "status": null,
        "sex": "Male",
        "blood_type": "B",
        "ninja_registration": "012607",
        "academy_grad_age": "12",
        "chunin_prom_age": null,
        "unique_traits": null
}
