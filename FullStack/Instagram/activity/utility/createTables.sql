CREATE TABLE IF NOT EXISTS user(
    uid VARCHAR(32) PRIMARY KEY,
    handle VARCHAR(30) NOT NULL UNIQUE,
    email_id VARCHAR(50) UNIQUE,
    phone BIGINT(10) UNIQUE,
    bio VARCHAR(150),
    is_verified BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    p_img_url VARCHAR(255)
)

CREATE TABLE IF NOT EXISTS user_follower(
    user_id VARCHAR(80) NOT NULL,
    follower_id VARCHAR(80) NOT NULL,
    is_pending BOOLEAN DEFAULT true,
    INDEX (user_id)
);