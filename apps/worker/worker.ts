import { pullSubmission } from "@repo/redis-stream/redis-client";

while(true) {
    const submissions = await pullSubmission()

    // if(submissions) {
    //     await processWithAi(submissions)
    // }
}