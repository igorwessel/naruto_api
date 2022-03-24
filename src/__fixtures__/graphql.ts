export const ninjasQuery = `
query($limit: Int!, $offset: Int!) {
    ninjas(limit: $limit, offset: $offset) {
            id
            name
            sex
            birthdate
            specie
            status
            blood_type
            academy_grad_age
            chunin_prom_age
            ninja_registration
            nature_type {
                id
                kekkei_genkai
                kekkei_tota
                name
            }
            ninja_attributes {
                age
                height
                ninja_rank
                season
                weight
            }
            occupation {
                id
                name
            }
            team {
                id
                name
                description
                members {
                    id
                    name
                }
                affiliation {
                    id
                    name
                }
            }
            tools {
                id
                name
                description
                games
                kanji
                manga_panini
                portugues
                romaji
                tv_brasileira
            }
            jutsus {
                id
                name
                description
                games
                hand_seals
                kanji
                manga_panini
                portugues
                range
                rank
                romaji
                tv_brasileira
                nature {
                    id
                    name
                }
                classification {
                    id
                    name
                }
                class {
                    id
                    name
                }
            }
            affiliation {
                id
                name
            }
            classification {
                id
                name
            }
            clan {
                id
                name
            }
            family {
                relationship
                details {
                    id
                    name
                }
            }
    }
}
`

export const ninjaDepthLimitError = `
{
  ninjas {
    family {
      details {
        family {
          details {
            family {
              details {
                family {
                  details {
                    family {
                      details {
                        family {
                          relationship
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export const teamsQuery = `
query($limit: Int!, $offset: Int!) {
  teams(limit: $limit, offset: $offset) {
    id
    name
    description
  }    
}
`

export const toolsQuery = `
query($limit: Int!, $offset: Int!) {
  tools(limit: $limit, offset: $offset) {
    id
    name
    description
    games
    kanji
    manga_panini
    portugues
    romaji
    tv_brasileira
    ninjas {
      id
      name
    }
  }
}
`
export const jutsusQuery = `
query($limit: Int!, $offset: Int!) {
 jutsus(limit: $limit, offset: $offset) {
    id
    name
    description
    games
    hand_seals
    kanji
    manga_panini
    portugues
    range
    rank
    romaji
    tv_brasileira
    nature {
      id
      kekkei_genkai
      kekkei_tota
      name
    }
    classification {
      id
      name
    }
    class {
      id
      name
    }
  }
}
`
