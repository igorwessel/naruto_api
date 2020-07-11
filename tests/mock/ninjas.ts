interface Ninja {
	id: number;
	name: string;
	birthdate: string | null;
	specie: string | null;
	status: string | null;
	sex: string | null;
	blood_type: string | null;
	ninja_registration: string | null;
	academy_grad_age: string | null;
	chunin_prom_age: string | null;
	unique_traits: string | null;
	occupation?: { id: number; name: string }[];
	affiliation?: { id: number; name: string }[];
	classification?: { id: number; name: string }[];
	clan?: { id: number; name: string }[];
}

export const ninja_without_relation: Ninja = {
	id: 812,
	name: 'Naruto Uzumaki',
	birthdate: 'October 10',
	specie: 'Human',
	status: null,
	sex: 'Male',
	blood_type: 'B',
	ninja_registration: '012607',
	academy_grad_age: '12',
	chunin_prom_age: null,
	unique_traits: null
};

export const ninjas: Ninja[] = [
	{
		id: 1,
		name: 'A (First Raikage)',
		birthdate: 'December 1',
		specie: 'Human',
		status: 'Deceased',
		sex: 'Male',
		blood_type: 'O',
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [
			{
				id: 1,
				name: 'Raikage'
			}
		],
		affiliation: [
			{
				id: 1,
				name: 'Kumogakure'
			}
		],
		classification: [],
		clan: []
	},
	{
		id: 2,
		name: 'A (Fourth Raikage)',
		birthdate: 'June 1',
		specie: 'Human',
		status: null,
		sex: 'Male',
		blood_type: 'A',
		ninja_registration: 'CL2211',
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [
			{
				id: 1,
				name: 'Raikage'
			},
			{
				id: 2,
				name: 'Supreme Leader of the Allied Shinobi Forces'
			}
		],
		affiliation: [
			{
				id: 1,
				name: 'Kumogakure'
			},
			{
				id: 2,
				name: 'Allied Shinobi Forces'
			}
		],
		classification: [],
		clan: []
	},
	{
		id: 3,
		name: 'A (Second Raikage)',
		birthdate: 'March 1',
		specie: 'Human',
		status: 'Deceased',
		sex: 'Male',
		blood_type: 'O',
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [
			{
				id: 1,
				name: 'Raikage'
			}
		],
		affiliation: [
			{
				id: 1,
				name: 'Kumogakure'
			}
		],
		classification: [],
		clan: []
	},
	{
		id: 4,
		name: 'A (Third Raikage)',
		birthdate: 'August 1',
		specie: 'Human',
		status: 'Deceased',
		sex: 'Male',
		blood_type: 'O',
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [
			{
				id: 1,
				name: 'Raikage'
			}
		],
		affiliation: [
			{
				id: 1,
				name: 'Kumogakure'
			}
		],
		classification: [],
		clan: []
	},
	{
		id: 5,
		name: 'Abiru',
		birthdate: null,
		specie: 'Human',
		status: null,
		sex: 'Male',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [],
		affiliation: [
			{
				id: 3,
				name: 'Sunagakure'
			}
		],
		classification: [],
		clan: []
	},
	{
		id: 6,
		name: 'Agara',
		birthdate: null,
		specie: 'Human',
		status: 'Deceased',
		sex: 'Male',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [],
		affiliation: [
			{
				id: 4,
				name: 'Takigakure'
			}
		],
		classification: [],
		clan: []
	},
	{
		id: 7,
		name: 'Agari',
		birthdate: null,
		specie: 'Human',
		status: null,
		sex: 'Female',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [],
		affiliation: [
			{
				id: 5,
				name: 'Land of Waves'
			}
		],
		classification: [],
		clan: []
	},
	{
		id: 8,
		name: 'Agari Kaisen',
		birthdate: null,
		specie: 'Human',
		status: null,
		sex: 'Male',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [
			{
				id: 3,
				name: 'Head of the Kedoin clan'
			}
		],
		affiliation: [],
		classification: [],
		clan: [
			{
				id: 41,
				name: 'Kedoin Clan'
			}
		]
	},
	{
		id: 9,
		name: 'Ageha',
		birthdate: null,
		specie: 'Human',
		status: null,
		sex: 'Female',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [],
		affiliation: [
			{
				id: 5,
				name: 'Land of Waves'
			}
		],
		classification: [],
		clan: []
	},
	{
		id: 10,
		name: 'Agira Ryūdōin',
		birthdate: null,
		specie: 'Human',
		status: 'Deceased',
		sex: 'Male',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [],
		affiliation: [],
		classification: [],
		clan: []
	},
	{
		id: 11,
		name: 'Ahiko',
		birthdate: null,
		specie: 'Human',
		status: null,
		sex: 'Male',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [
			{
				id: 4,
				name: 'Prisoner'
			}
		],
		affiliation: [],
		classification: [],
		clan: []
	},
	{
		id: 12,
		name: 'Aho Bird',
		birthdate: null,
		specie: 'Crow',
		status: null,
		sex: null,
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [],
		affiliation: [],
		classification: [],
		clan: []
	},
	{
		id: 13,
		name: 'Aino',
		birthdate: null,
		specie: 'Human',
		status: 'Deceased',
		sex: 'Female',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [
			{
				id: 5,
				name: 'Attendant of the Land of Ancestors'
			}
		],
		affiliation: [
			{
				id: 6,
				name: 'Land of Ancestors'
			}
		],
		classification: [],
		clan: []
	},
	{
		id: 14,
		name: 'Ajisai',
		birthdate: null,
		specie: 'Human',
		status: 'Deceased',
		sex: 'Female',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [],
		affiliation: [
			{
				id: 7,
				name: 'Amegakure'
			}
		],
		classification: [],
		clan: []
	},
	{
		id: 15,
		name: 'Akaboshi',
		birthdate: null,
		specie: 'Human',
		status: null,
		sex: 'Male',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [],
		affiliation: [],
		classification: [],
		clan: []
	}
];

export const ninjasPage2: Ninja[] = [
	{
		id: 16,
		name: 'Akahoshi',
		birthdate: null,
		specie: 'Human',
		status: null,
		sex: 'Male',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [
			{
				id: 6,
				name: 'Hoshikage'
			}
		],
		affiliation: [
			{
				id: 8,
				name: 'Hoshigakure'
			}
		],
		classification: [],
		clan: []
	},
	{
		id: 17,
		name: 'Akamaru',
		birthdate: 'July 7',
		specie: 'Ninken',
		status: null,
		sex: 'Male',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [],
		affiliation: [
			{
				id: 2,
				name: 'Allied Shinobi Forces'
			},
			{
				id: 9,
				name: 'Konohagakure'
			}
		],
		classification: [],
		clan: [
			{
				id: 31,
				name: 'Inuzuka Clan'
			}
		]
	},
	{
		id: 18,
		name: "Akane's Father",
		birthdate: null,
		specie: 'Human',
		status: null,
		sex: 'Male',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [],
		affiliation: [
			{
				id: 5,
				name: 'Land of Waves'
			}
		],
		classification: [],
		clan: []
	},
	{
		id: 19,
		name: 'Akane',
		birthdate: null,
		specie: 'Human',
		status: null,
		sex: 'Male',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [
			{
				id: 7,
				name: 'Carpenter'
			}
		],
		affiliation: [
			{
				id: 5,
				name: 'Land of Waves'
			}
		],
		classification: [],
		clan: []
	},
	{
		id: 20,
		name: 'Akane (Kunoichi)',
		birthdate: null,
		specie: 'Human',
		status: null,
		sex: 'Female',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [],
		affiliation: [
			{
				id: 9,
				name: 'Konohagakure'
			}
		],
		classification: [],
		clan: []
	},
	{
		id: 21,
		name: 'Akari Tatsushiro',
		birthdate: null,
		specie: 'Human',
		status: null,
		sex: 'Female',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [],
		affiliation: [],
		classification: [],
		clan: [
			{
				id: 39,
				name: 'Ryu Clan'
			}
		]
	},
	{
		id: 22,
		name: 'Akatsuchi',
		birthdate: 'January 11',
		specie: 'Human',
		status: null,
		sex: 'Male',
		blood_type: 'B',
		ninja_registration: 'IW-08718',
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [
			{
				id: 8,
				name: "Tsuchikage's Bodyguard"
			},
			{
				id: 9,
				name: "Tsuchikage's Assistant"
			}
		],
		affiliation: [
			{
				id: 2,
				name: 'Allied Shinobi Forces'
			},
			{
				id: 10,
				name: 'Iwagakure'
			}
		],
		classification: [],
		clan: []
	},
	{
		id: 23,
		name: 'Akemaru',
		birthdate: null,
		specie: 'Ninken',
		status: null,
		sex: 'Male',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [],
		affiliation: [
			{
				id: 9,
				name: 'Konohagakure'
			}
		],
		classification: [],
		clan: [
			{
				id: 31,
				name: 'Inuzuka Clan'
			}
		]
	},
	{
		id: 24,
		name: 'Akino',
		birthdate: null,
		specie: 'Ninken',
		status: null,
		sex: 'Male',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [],
		affiliation: [
			{
				id: 9,
				name: 'Konohagakure'
			}
		],
		classification: [
			{
				id: 1,
				name: 'Summon'
			}
		],
		clan: []
	},
	{
		id: 25,
		name: 'Akio',
		birthdate: null,
		specie: 'Human',
		status: null,
		sex: 'Male',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [],
		affiliation: [
			{
				id: 11,
				name: 'Land of Forests'
			}
		],
		classification: [],
		clan: []
	},
	{
		id: 26,
		name: 'Akita Inuzuka',
		birthdate: 'April 20',
		specie: 'Human',
		status: null,
		sex: 'Female',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [
			{
				id: 10,
				name: 'Scientist'
			},
			{
				id: 11,
				name: "Katasuke Tono's Assistant"
			}
		],
		affiliation: [
			{
				id: 9,
				name: 'Konohagakure'
			}
		],
		classification: [],
		clan: [
			{
				id: 31,
				name: 'Inuzuka Clan'
			}
		]
	},
	{
		id: 27,
		name: 'Akkun',
		birthdate: null,
		specie: 'Akuta',
		status: 'Deceased',
		sex: null,
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [],
		affiliation: [
			{
				id: 9,
				name: 'Konohagakure'
			},
			{
				id: 10,
				name: 'Iwagakure'
			}
		],
		classification: [],
		clan: []
	},
	{
		id: 28,
		name: 'Amachi',
		birthdate: null,
		specie: 'Human',
		status: null,
		sex: 'Male',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [
			{
				id: 10,
				name: 'Scientist'
			}
		],
		affiliation: [
			{
				id: 12,
				name: 'Land of the Sea'
			},
			{
				id: 13,
				name: 'Otogakure'
			}
		],
		classification: [
			{
				id: 2,
				name: 'Medical-nin'
			}
		],
		clan: []
	},
	{
		id: 29,
		name: 'Amado',
		birthdate: null,
		specie: 'Human',
		status: null,
		sex: 'Male',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: null,
		unique_traits: null,
		occupation: [
			{
				id: 12,
				name: 'Inner'
			}
		],
		affiliation: [
			{
				id: 9,
				name: 'Konohagakure'
			},
			{
				id: 14,
				name: 'Kara'
			}
		],
		classification: [],
		clan: []
	},
	{
		id: 30,
		name: 'Amagi',
		birthdate: null,
		specie: 'Human',
		status: null,
		sex: 'Male',
		blood_type: null,
		ninja_registration: null,
		academy_grad_age: null,
		chunin_prom_age: '13',
		unique_traits: null,
		occupation: [],
		affiliation: [
			{
				id: 3,
				name: 'Sunagakure'
			}
		],
		classification: [],
		clan: []
	}
];

export const ninjaID91Family: { id: number; relationship: string; name: string }[] = [
	{
		id: 745,
		relationship: 'Grandfather',
		name: 'Minato Namikaze'
	},
	{
		id: 651,
		relationship: 'Grandmother',
		name: 'Kushina Uzumaki'
	},
	{
		id: 812,
		relationship: 'Father',
		name: 'Naruto Uzumaki'
	},
	{
		id: 398,
		relationship: 'Great-Grandfather',
		name: 'Hyūga Elder'
	},
	{
		id: 357,
		relationship: 'Grandfather',
		name: 'Hiashi Hyūga'
	},
	{
		id: 386,
		relationship: 'Granduncle',
		name: 'Hizashi Hyūga'
	},
	{
		id: 373,
		relationship: 'Grandmother',
		name: "Hinata and Hanabi's Mother"
	},
	{
		id: 372,
		relationship: 'Mother',
		name: 'Hinata Hyūga'
	},
	{
		id: 336,
		relationship: 'Aunt',
		name: 'Hanabi Hyūga'
	},
	{
		id: 367,
		relationship: 'Sister',
		name: 'Himawari Uzumaki'
	},
	{
		id: 820,
		relationship: 'First cousin once removed',
		name: 'Neji Hyūga'
	}
];

export const ninjaID91Tools: { id: number; name: string }[] = [
	{ id: 25, name: 'Chakra Blade' },
	{ id: 105, name: 'Flash Bomb' },
	{ id: 133, name: 'Jutsu Absorption Arm' },
	{ id: 217, name: 'Shinobi Gauntlet' },
	{ id: 233, name: 'Sword' }
];

export const ninjaID91Teams: { id: number; name: string }[] = [{ id: 116, name: 'Team 7 (Konohamaru)' }];

export const ninjaID91NatureType: {
	id: number;
	name: string;
	kekkei_genkai: boolean;
	kekkei_tota: boolean;
	affinity: boolean;
	only: string | null;
}[] = [
	{
		id: 1,
		name: 'Lightning Release',
		kekkei_genkai: false,
		kekkei_tota: false,
		affinity: true,
		only: null
	},
	{ id: 7, name: 'Wind Release', kekkei_genkai: false, kekkei_tota: false, affinity: false, only: null },
	{ id: 3, name: 'Water Release', kekkei_genkai: false, kekkei_tota: false, affinity: false, only: null }
];

export const ninjaID91Jutsus: {
	id: number;
	name: string;
	literal_english_name: string | null;
	english_anime_name: string | null;
	range: string | null;
	hand_seals: string | null;
	related_jutsu: { id: number; name: string } | null;
	parent_jutsu: { id: number; name: string }[];
	derived_jutsu: { id: number; name: string }[];
}[] = [
	{
		id: 183,
		name: 'Boruto Stream',
		literal_english_name: null,
		english_anime_name: null,
		range: 'Short range (0-5m)',
		hand_seals: null,
		related_jutsu: null,
		parent_jutsu: [{ id: 2415, name: 'Wind Release: Gale Palm' }],
		derived_jutsu: []
	},
	{
		id: 894,
		name: 'Gentle Fist',
		literal_english_name: null,
		english_anime_name: null,
		range: 'Short range (0-5m)',
		hand_seals: null,
		related_jutsu: null,
		parent_jutsu: [],
		derived_jutsu: [
			{ id: 624, name: 'Eight Trigrams Mountain Crusher' },
			{ id: 625, name: 'Eight Trigrams One Hundred Twenty-Eight Palms' },
			{ id: 627, name: 'Eight Trigrams Palms Revolving Heaven' },
			{ id: 634, name: 'Eight Trigrams Sixteen Palms' },
			{ id: 635, name: 'Eight Trigrams Sixty-Four Palms' },
			{ id: 637, name: 'Eight Trigrams Thirty-Two Palms' },
			{ id: 639, name: 'Eight Trigrams Twin Lions Crumbling Attack' },
			{ id: 641, name: 'Eight Trigrams Vacuum Palm' },
			{ id: 642, name: 'Eight Trigrams Vacuum Wall Palm' },
			{ id: 895, name: 'Gentle Fist: Tenketsu Needle' },
			{ id: 897, name: 'Gentle Fist Art One Blow Body' },
			{ id: 902, name: 'Gentle Step Twin Lion Fists' },
			{ id: 1489, name: 'Palm Bottom' },
			{ id: 1568, name: 'Protecting Eight Trigrams Sixty-Four Palms' },
			{ id: 2246, name: 'Water Needle' }
		]
	},
	{
		id: 959,
		name: 'Harem Technique',
		literal_english_name: null,
		english_anime_name: null,
		range: null,
		hand_seals: 'Ram → Snake → Tiger → Ram',
		related_jutsu: null,
		parent_jutsu: [
			{ id: 1808, name: 'Sexy Technique' },
			{ id: 1818, name: 'Shadow Clone Technique' }
		],
		derived_jutsu: [
			{ id: 1805, name: 'Sexy: Boy on Boy Technique' },
			{ id: 1806, name: 'Sexy: Girl on Girl Technique' },
			{ id: 1807, name: 'Sexy Reverse Harem Technique' }
		]
	},
	{
		id: 1073,
		name: 'Improvised Secret Technique: Lightning Ball Shuriken Technique',
		literal_english_name: null,
		english_anime_name: null,
		range: 'Mid range (5-10m)',
		hand_seals: null,
		related_jutsu: null,
		parent_jutsu: [{ id: 1211, name: 'Lightning Ball' }],
		derived_jutsu: []
	},
	{
		id: 1150,
		name: 'Kāma',
		literal_english_name: 'Linchpin',
		english_anime_name: null,
		range: null,
		hand_seals: null,
		related_jutsu: null,
		parent_jutsu: [],
		derived_jutsu: [
			{ id: 1151, name: 'Kāma Rift' },
			{ id: 1614, name: "Rasengan: 'Unison'" }
		]
	},
	{
		id: 1151,
		name: 'Kāma Rift',
		literal_english_name: null,
		english_anime_name: null,
		range: 'All ranges',
		hand_seals: null,
		related_jutsu: null,
		parent_jutsu: [{ id: 1150, name: 'Kāma' }],
		derived_jutsu: []
	},
	{
		id: 1263,
		name: 'Lightning Release Bullet: Powerful Breath',
		literal_english_name: null,
		english_anime_name: null,
		range: 'Long range (10m+)',
		hand_seals: 'Ram',
		related_jutsu: null,
		parent_jutsu: [],
		derived_jutsu: []
	},
	{
		id: 1249,
		name: 'Lightning Release: Purple Electricity',
		literal_english_name: null,
		english_anime_name: null,
		range: 'Short to Mid range (0-10m)',
		hand_seals: null,
		related_jutsu: null,
		parent_jutsu: [],
		derived_jutsu: []
	},
	{
		id: 1259,
		name: 'Lightning Release: Thunderclap Arrow',
		literal_english_name: null,
		english_anime_name: null,
		range: 'Short to Mid range (0-10m)',
		hand_seals: 'Ram',
		related_jutsu: null,
		parent_jutsu: [],
		derived_jutsu: []
	},
	{
		id: 1,
		name: "'Lightning': Triple",
		literal_english_name: null,
		english_anime_name: null,
		range: 'All ranges',
		hand_seals: null,
		related_jutsu: null,
		parent_jutsu: [],
		derived_jutsu: []
	},
	{
		id: 1514,
		name: 'Parent and Child Rasengan',
		literal_english_name: 'Parent and Child Spiralling Sphere',
		english_anime_name: 'Super Uzumaki Rasengan (超うずまき螺旋丸, Chō Uzumaki Rasengan)',
		range: 'Short range (0-5m)',
		hand_seals: null,
		related_jutsu: null,
		parent_jutsu: [{ id: 1613, name: 'Rasengan' }],
		derived_jutsu: []
	},
	{
		id: 1613,
		name: 'Rasengan',
		literal_english_name: 'Spiralling Sphere',
		english_anime_name: 'Power Strike',
		range: 'Short range (0-5m)',
		hand_seals: null,
		related_jutsu: { id: 2068, name: 'Tailed Beast Ball' },
		parent_jutsu: [],
		derived_jutsu: [
			{ id: 114, name: 'Big Ball Rasengan' },
			{ id: 118, name: 'Big Ball Spiralling Serial Zone Spheres' },
			{ id: 431, name: 'Deep Crimson Spiral' },
			{ id: 900, name: 'Gentle Step Spiralling Twin Lion Fists' },
			{ id: 1514, name: 'Parent and Child Rasengan' },
			{ id: 1542, name: 'Planetary Rasengan' },
			{ id: 1614, name: "Rasengan: 'Unison'" },
			{ id: 1617, name: 'Rasengan: Flash' },
			{ id: 1665, name: 'Runt Ball Rasengan' },
			{ id: 1678, name: 'Sage Art: Magnet Release Rasengan' },
			{ id: 1679, name: 'Sage Art: Many Ultra-Big Ball Spiralling Serial Spheres' },
			{ id: 1940, name: 'Spiralling Absorption Sphere' },
			{ id: 1944, name: 'Spiralling Serial Spheres' },
			{ id: 1945, name: 'Spiralling Strife Spheres' },
			{ id: 2077, name: 'Tailed Beast Rasengan' },
			{ id: 2195, name: 'Typhoon Water Vortex Technique' },
			{ id: 2209, name: 'Ultra-Big Ball Rasengan' },
			{ id: 2211, name: 'Ultra-Many Spiralling Serial Spheres' },
			{ id: 2225, name: 'Vanishing Rasengan' },
			{ id: 2428, name: 'Wind Release: Rasengan' },
			{ id: 2429, name: 'Wind Release: Rasenshuriken' }
		]
	},
	{
		id: 1614,
		name: "Rasengan: 'Unison'",
		literal_english_name: "Spiralling Sphere: 'Unison'",
		english_anime_name: null,
		range: 'Short range (0-5m)',
		hand_seals: null,
		related_jutsu: null,
		parent_jutsu: [
			{ id: 1150, name: 'Kāma' },
			{ id: 1613, name: 'Rasengan' }
		],
		derived_jutsu: []
	},
	{
		id: 1808,
		name: 'Sexy Technique',
		literal_english_name: null,
		english_anime_name: null,
		range: null,
		hand_seals: 'Ram',
		related_jutsu: null,
		parent_jutsu: [{ id: 2158, name: 'Transformation Technique' }],
		derived_jutsu: [
			{ id: 185, name: 'Bouncy Bouncy Technique' },
			{ id: 959, name: 'Harem Technique' },
			{ id: 1805, name: 'Sexy: Boy on Boy Technique' },
			{ id: 1806, name: 'Sexy: Girl on Girl Technique' },
			{ id: 1807, name: 'Sexy Reverse Harem Technique' },
			{ id: 1809, name: 'Sexy Technique: Pole Dance and Nice Body' }
		]
	},
	{
		id: 1818,
		name: 'Shadow Clone Technique',
		literal_english_name: null,
		english_anime_name: null,
		range: null,
		hand_seals: 'Clone seal or Tiger or Horse[2]',
		related_jutsu: { id: 1857, name: 'Shuriken Shadow Clone Technique' },
		parent_jutsu: [],
		derived_jutsu: [
			{ id: 30, name: 'All Directions Shuriken' },
			{ id: 118, name: 'Big Ball Spiralling Serial Zone Spheres' },
			{ id: 296, name: 'Clone Body Blow' },
			{ id: 299, name: 'Clone Great Explosion' },
			{ id: 304, name: 'Clone Spinning Heel Drop' },
			{ id: 306, name: 'Clone Trap' },
			{ id: 399, name: 'Dance of the Crescent Moon' },
			{ id: 490, name: 'Double Black Panther' },
			{ id: 598, name: 'Earth Release: Shadow Clone' },
			{ id: 796, name: 'Five Release Great Combo Technique' },
			{ id: 959, name: 'Harem Technique' },
			{ id: 1025, name: 'Human Beast Mixture Transformation — Three-Headed Wolf' },
			{ id: 1251, name: 'Lightning Release: Shadow Clone Technique' },
			{ id: 1275, name: 'Lightning Transmission' },
			{ id: 1385, name: 'Multiple Shadow Clone Technique' },
			{ id: 1406, name: 'Naruto Region Combo' },
			{ id: 1409, name: 'Naruto Uzumaki Combo' },
			{ id: 1413, name: 'Naruto Uzumaki Two Thousand Combo' },
			{ id: 1497, name: 'Parachute' },
			{ id: 1636, name: 'Reverse Mist Beheading' },
			{ id: 1682, name: 'Sage Art: Super Tailed Beast Rasenshuriken' },
			{ id: 1767, name: 'Sealing Technique: Three Directions Seal' },
			{ id: 1805, name: 'Sexy: Boy on Boy Technique' },
			{ id: 1806, name: 'Sexy: Girl on Girl Technique' },
			{ id: 1807, name: 'Sexy Reverse Harem Technique' },
			{ id: 1868, name: 'Six Paths: Ultra-Big Ball Rasenshuriken' },
			{ id: 1981, name: 'Suicide Bombing Clone' },
			{ id: 2065, name: 'Tail Chasing Fang Fang Rotating Fang' },
			{ id: 2211, name: 'Ultra-Many Spiralling Serial Spheres' },
			{ id: 2221, name: 'Uzumaki Formation' }
		]
	},
	{
		id: 2008,
		name: 'Summoning Technique',
		literal_english_name: null,
		english_anime_name: null,
		range: null,
		hand_seals: 'Boar → Dog → Bird → Monkey → Ram[2]',
		related_jutsu: { id: 1637, name: 'Reverse Summoning Technique' },
		parent_jutsu: [],
		derived_jutsu: [
			{ id: 50, name: 'Amplification Summoning Technique' },
			{ id: 121, name: 'Binding Snake Glare Spell' },
			{ id: 577, name: 'Earth Release: Mutability' },
			{ id: 600, name: 'Earth Release Resurrection Technique: Corpse Soil' },
			{ id: 842, name: 'Formation of Ten Thousand Snakes' },
			{ id: 999, name: 'Hidden Shadow Snake Hands' },
			{ id: 1000, name: 'Hidden Shadow Wild Snake Hands' },
			{ id: 1322, name: 'Many Hidden Shadow Snake Hands' },
			{ id: 1610, name: 'Rain of Spiders' },
			{ id: 1900, name: 'Snake Mouth Bind' },
			{ id: 1917, name: 'Sound Four: Summoning: Four Beasts Encirclement Formation' },
			{ id: 1983, name: 'Summoning: Crushing Toad Stomach' },
			{ id: 1984, name: 'Summoning: Demonic Statue of the Outer Path' },
			{ id: 1986, name: 'Summoning: Earth Release: Tracking Fang Technique' },
			{ id: 1988, name: 'Summoning: Food Cart Destroyer Technique' },
			{ id: 1991, name: 'Summoning: Impure World Reincarnation' },
			{ id: 1992, name: 'Summoning: Iron Maiden' },
			{ id: 1997, name: 'Summoning: Quick Beheading Dance' },
			{ id: 1998, name: 'Summoning: Quintuple Rashōmon' },
			{ id: 1999, name: 'Summoning: Rainwater Gate' },
			{ id: 2000, name: 'Summoning: Rashōmon' },
			{ id: 2003, name: 'Summoning: Toad Mouth Bind' },
			{ id: 2004, name: 'Summoning: Toad Shop Technique' },
			{ id: 2005, name: 'Summoning: Torture Chamber' },
			{ id: 2006, name: 'Summoning: Triple Rashōmon' },
			{ id: 2007, name: 'Summoning Rinnegan' },
			{ id: 2115, name: 'Thousand Bee Stings Technique' }
		]
	},
	{
		id: 2034,
		name: 'Surging Fire Wild Dance',
		literal_english_name: null,
		english_anime_name: 'Wild Dance of Spouting Fire',
		range: 'Short range (0-5m)',
		hand_seals: null,
		related_jutsu: null,
		parent_jutsu: [],
		derived_jutsu: []
	},
	{
		id: 2225,
		name: 'Vanishing Rasengan',
		literal_english_name: 'Vanishing Spiralling Sphere',
		english_anime_name: null,
		range: 'All ranges',
		hand_seals: null,
		related_jutsu: { id: 2428, name: 'Wind Release: Rasengan' },
		parent_jutsu: [{ id: 1613, name: 'Rasengan' }],
		derived_jutsu: [{ id: 2536, name: 'All derived jutsu' }]
	},
	{
		id: 2306,
		name: 'Water Release: Surging Sea',
		literal_english_name: null,
		english_anime_name: null,
		range: 'Short to Mid range (0-10m)',
		hand_seals: null,
		related_jutsu: null,
		parent_jutsu: [],
		derived_jutsu: []
	},
	{
		id: 2326,
		name: 'Water Release: Water Formation Wall',
		literal_english_name: null,
		english_anime_name: null,
		range: 'Short range (0-5m)',
		hand_seals: 'Tiger → Snake → Rat → Snake → Tiger',
		related_jutsu: { id: 2325, name: 'Water Release: Water Formation Pillar' },
		parent_jutsu: [],
		derived_jutsu: []
	},
	{
		id: 2415,
		name: 'Wind Release: Gale Palm',
		literal_english_name: null,
		english_anime_name: null,
		range: 'Short to Mid range (0-10m)',
		hand_seals: 'Snake → Ram → Boar → Horse → Bird → Clap Hands Together',
		related_jutsu: null,
		parent_jutsu: [],
		derived_jutsu: [{ id: 183, name: 'Boruto Stream' }]
	}
];

export const ninjaID91Attributes: {
	id: number;
	age: string | null;
	height: string | null;
	weight: string | null;
	ninja_rank: string;
	season: string;
}[] = [
	{ id: 54, age: null, height: null, weight: null, ninja_rank: 'Genin', season: 'Gaiden' },
	{ id: 55, age: '5', height: '110 cm-122 cm', weight: null, ninja_rank: null, season: 'Blank Period' },
	{ id: 56, age: '12', height: '145 cm', weight: null, ninja_rank: null, season: 'Boruto Movie' },
	{ id: 57, age: '16', height: '163 cm', weight: null, ninja_rank: null, season: 'Boruto Manga' }
];
