import {db} from "./database.js"
import { questionsTable } from "./schema.js"

async function seed () {
    
    /* INSERER TRUCS DANS LA BASE
    try {
        console.log('Database seeding starting ...')

        await db.delete(questionsTable)

        const seedQuestions = [
			{
				questionText: 'Quelle est la cpaitale de la France?',
				answer: 'Paris',
				difficulty: 'easy',
			},
			{
				questionText: 'Quel est le plus grand ocen du monde?',
				answer: "L'ocean Pacifique",
				difficulty: 'medium',
			},
			{
				questionText: 'Qui a ecrit "Les Miserables"?',
				answer: 'Victor Hugo',
				difficulty: 'difficult',
			},
		]
        await db.insert(questionsTable).values(seedQuestions)

        console.log('Database seeded successfully e')
    } catch (error) {
        console.log('Error sending database', error)
    }
        */
}

seed();