import e from 'express'
import { db } from './index.ts'
import {
  userTable,
  habitTable,
  entriesTable,
  tagsTable,
  habitTagsTable,
} from './schema.ts'

const seed = async () => {
  console.log('Seeding database...')

  try {
    console.log('cleaning up existing data...')

    await db.delete(userTable)
    await db.delete(habitTable)
    await db.delete(entriesTable)
    await db.delete(tagsTable)
    await db.delete(habitTagsTable)

    console.log('seeding users...')
    const [demoUser] = await db
      .insert(userTable)
      .values({
        username: 'testuser',
        password: 'password123',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
      })
      .returning()

    console.log('seeding tags...')
    const [healthTag] = await db
      .insert(tagsTable)
      .values({ name: 'Health', color: '#10b981' })
      .returning()

    const [excerciseHabit] = await db.insert(habitTable).values({
        userId: demoUser?.id!!,
        name: 'Morning Exercise',
        description: '30 minutes of exercise every morning',
        frequency: 'daily',
        targetCount: 1,
    }).returning()

    await db.insert(habitTagsTable).values({
        habitId: excerciseHabit?.id!!,
        tagId: healthTag?.id!!,
    });

    console.log('adding completion entry for today...');
    const today = new Date();
    today.setHours(12, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
    
        await db.insert(entriesTable).values({
            completionDate: date,
            habitId: excerciseHabit?.id!!,
            note: `Completed on ${date.toDateString()}`
        })
    }

    console.log('Database seeding completed successfully.');
  } catch (e) {
    console.error('Error seeding database:', e);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seed().then(() => {
    console.log('Seeding finished, exiting process.');
    process.exit(0);
  }).catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  });
}
