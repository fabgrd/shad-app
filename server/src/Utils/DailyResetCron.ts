import cron from 'node-cron';
import User from '../models/User';
import Routine from '../models/Routine';
import RoutineTasks from '../models/RoutineTasks';

const dailyResetCron = async () => {
    cron.schedule('0 0 * * *', async () => { // Run every day at midnight
        console.log('Running daily reset cron job');
        const users = await User.find().populate('routine');
        
        for (const user of users) {
            if (user.routine) {
                // Reset all tasks to uncompleted
                await RoutineTasks.updateMany(
                    { _id: { $in: user.routine.tasks } },
                    { $set: { completed: false } }
                );

                // Reset routine completion status
                user.routine.completed = false;
                user.routine.cheatDay = false;
                await user.routine.save();

                console.log(`Reset routine for user: ${user._id}`);
            }
        }
    });
};

export default dailyResetCron;