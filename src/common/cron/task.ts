import { CronJob } from 'cron';

export abstract class Task {
    /**
     *
     * @param cronTime The time to fire off your job. This can be in the form of cron syntax or a JS ```Date``` object.
     */
    constructor(cronTime: string | Date) {
        const job = new CronJob(cronTime, this.handle.bind(this), null, true, 'Asia/Shanghai');
    }

    /**
     * 定时任务每次执行时会调用该方法，子类重写该方法，写入业务逻辑
     */
    protected async handle() {}
}
