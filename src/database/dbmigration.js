const { Client } = require('pg')
const dburl = process.env.DATABASE_URL
async function connectdb() {
    console.log(dburl);

    let client = new Client({
        connectionString: dburl
    })
    client.connect()
    const usertable = `
    CREATE TABLE users(
        no SERIAL,
        user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(150) NOT NULL UNIQUE,
         username TEXT  NULL,
        password TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_email_verify BOOLEAN DEFAULT TRUE,
        auth_type TEXT DEAFULT google,
        user_type TEXT DEFAULT 'user'
    )
`

    const subscriptiontable = `
       CREATE TABLE subscription_detail (
    subscription_detail_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    subscription_type_id int4 NOT NULL,
        CONSTRAINT fk_subscription FOREIGN KEY(subscription_type_id)
                REFERENCES subscription_type(subscription_type_id),
    storage_used REAL NOT NULL DEFAULT 0,
    all_subscription_history TEXT[],
    start_date TEXT NULL,
    expiry_date TEXT NULL,
    auto_renew BOOLEAN DEFAULT FALSE,
    reminder_count_used INT2 DEFAULT 0,
    capsule_count_used INT2 DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)
`

    const plansdetailstable = `
CREATE TABLE subscription_type(
    subscription_type_id SERIAL PRIMARY KEY,
    subscription_name TEXT NOT NULL,
    storage_limit INT NOT NULL,
    reminder_count INT NOT NULL,
    capsule_count INT NOT NULL,
    download_per_fragment_count INT NOT NULL,
    note_char_limt INT NOT NULL,
    monthly_cost INT NOT NULL,
    yearly_cost INT NOT NULL
)
`
    const remindertable = `
CREATE TABLE reminder (
    reminder_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
        CONSTRAINT fk_user_id FOREIGN KEY(user_id)
            REFERENCES users(user_id),
    fragment_id UUID NOT NULL,
        CONSTRAINT fk_fragment_id FOREIGN KEY(fragment_id)
            REFERENCES fragment(fragment_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TEXT NOT NULL,
    is_enable BOOLEAN DEFAULT FALSE,
    reminder_time TEXT NULL
)
`
    const capsuletable = `
        CREATE TABLE capsules (
            capsule_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL,
                CONSTRAINT fk_user_id FOREIGN KEY(user_id)
                REFERENCES users(user_id),
            capsule_name VARCHAR(50) NULL,
            capsule_size REAL NOT NULL DEFAULT 0,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ NULL,
            is_deleted BOOLEAN DEFAULT FALSE
        )
    `

    const fragmenttable = `
            CREATE TABLE fragments(
            fragment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            capsule_id UUID NOT NULL,
            CONSTRAINT fk_capsule FOREIGN KEY(capsule_id)
                REFERENCES capsule(capsule_id) on delete cascade,
            size INT NOT NULL,
            fragment_type TEXT NOT NULL,
            created_at NOT NULL TIMESTAMPZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT NULL,
            tag VARCHAR(100) NULL,
            reminder BOOLEAN DEFAULT FALSE,
            download_count INT DEFAULT 0,
            url TEXT NULL,
            text_content VARCHAR(10000) NULL,
            file_name VARCHAR(500) DEFAULT NULL,
             is_deleted BOOLEAN DEFAULT FALSE
            )
`
const feedback = `CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,               
    user_id UUID NOT NULL,                 
    bugs TEXT,                           
    features TEXT,                       
    improvements TEXT,                   
    suggestions TEXT,                    
    created_at TIMESTAMP DEFAULT NOW()   
)`;

    // const deltetable = `DROP TABLE notes `
    // await client.query(usertable)
    // await client.query(plansdetailstable)
    // await client.query(subscriptiontable)
    // await client.query(capsuletable)
    // await client.query(fragmenttable)
    // await client.query(feedback)

    ///indexinng
    // reate index capsule_index on capsules (user_id, created_at)
    // -- create index fragment_index on fragments (capsule_id, created_at)
    
    await client.query(remindertable)
    console.log("Table created successfully!");
}
// connectdb()