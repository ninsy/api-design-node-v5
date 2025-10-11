# Intro

## Browser JavaScript

    - Environment: Runs in the browser's JavaScript engine (V8 in Chrome, SpiderMonkey in Firefox)
    - Primary Purpose: Manipulate the DOM, handle user interactions, make HTTP requests
    - Global Object: `window`
    - APIs Available: DOM API, Web APIs (fetch, localStorage, etc.)
    - Security: Sandboxed environment with restrictions (CORS, no file system access)
    - Module System: ES Modules, script tags

## Node.js JavaScript

    - Environment: Runs on the server using Chrome's V8 engine
    - Primary Purpose: Build servers, access file systems, interact with databases
    - Global Object: `global` (or globalThis)
    - APIs Available: File system, networking, process management, crypto
    - Security: Full system access (must implement your own security)
    - Module System: CommonJS historically, now also ES Modules

###    console.log(this) // at node

// TODO: async hooks for perf

setTimeout, performance, crypto, atob, setImmediate, setInterval, etc...

## db migrations

### Schema migration

```sql
CREATE TABLE tags (
    id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

ALTER TABLE habits ADD COLUMN is_active BOOLEAN DEFAULT true;

CREATE INDEX idx_habits_user_id ON HABITS(user_id);

ALTER TABLE users ADD CONSTRAINT user_email_unique UNIQUE (email)
```

### Data migration

```sql
UPDATE habits
SET category = CASE
    WHEN name ILIKE '%exercise%' THEN 'fitness'
    WHEN name ILIKE '%read%' THEN 'learning'
    ELSE 'other'
END;

INSERT INTO habit_tags (habit_id, tag_id)
SELECT h.id t.id
FROM habits h, tags t
WHERE h.category = t.name

DELETE FROM habits WHERE created_at < '2020-01-01';

```