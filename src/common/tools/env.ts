function getEnv(): string {
    const env = process.env.NODE_ENV || 'development';
    return env;
}

export default getEnv;
