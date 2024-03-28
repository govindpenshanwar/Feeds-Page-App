import express, { json } from 'express';
import { db } from './DbConfig/Config.js';
import bodyParser from 'body-parser';
import cors from 'cors'
const port = 4000;
import isAdmin from './middleware.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(cookieParser());


// const authenticateUser = (req, res, next) => {
//     const token = req.cookies || req.body.token;

//     if (!token) {
//         return res.status(401).json({ success: false, message: 'No token provided' });
//     }

//     // Verify token
//     jwt.verify(token, 'secret', (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ success: false, message: 'Failed to authenticate token' });
//         } else {
//             // Store decoded token in request for further use
//             req.decoded = decoded;
//             next();
//         }
//     });
// };

// app.use('/', authenticateUser)

app.get('/api/getPosts/:username', async (req, res) => {
    const { username } = req.params;
    try {
        // const dbQuery = `SELECT * from posts WHERE username = $1 AND status = 'accepted'`;
        const dbQuery = `SELECT * from posts WHERE username = $1 `;
        const result = await db.query(dbQuery, [username]);
        console.log(result.rows);
        res.json({
            success: true,
            message: result.rows
        })

    } catch (error) {
        console.error("Err getting posts =>", error.message);
    }
})

app.get('/api/getAllPosts', async (req, res) => {
    try {
        const dbQuery = `SELECT * from posts WHERE status = 300 `;
        const result = await db.query(dbQuery);
        console.log(result.rows);
        res.json({
            success: true,
            message: result.rows
        })

    } catch (error) {
        console.error("Err getting posts =>", error.message);
    }
})

app.get('/api/getOtherPosts/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const dbQuery = `SELECT * FROM posts WHERE username != $1 and status != 300`;
        const result = await db.query(dbQuery, [username]);
        console.log(result.rows);
        res.json({
            success: true,
            message: result.rows
        });
    } catch (error) {
        console.error("Error getting other posts:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

app.get('/otherPost', async (req, res) => {
    try {
        const queryText = `SELECT  * FROM posts;`
        const result = await db.query(queryText);
        console.log(result.rows);
        res.json({
            success: true,
            message: result.rows
        })

    } catch (error) {
        console.error("Err getting data => ", error.message);
    }
})

app.post('/signUp', async (req, res) => {
    const { username, password, email, role, phone } = req.body;
    try {
        const dbQuery = `INSERT INTO signUp (username,password,email,role,phone) VALUES ($1, $2, $3, $4,$5) ;`


        const result = await db.query(dbQuery, [username, password, email, role, phone], (err, res) => {
            if (!err) {
                console.log(res.rows);
            } else {
                console.error("Err at posting data", err.message);
            }
        });


        return res.json({
            sucess: true,
            data: result
        })

    } catch (error) {
        console.error("Err at signup route => ", error.message);
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const dbQuery = `SELECT * FROM signup WHERE username = $1 AND password = $2;`
        const result = await db.query(dbQuery, [username, password]);

        const secret = 'secret'
        if (result.rowCount == 1) {
            console.log(result.rows);
            const user = result.rows[0];
            const tokendata = {
                id: user.id,
                username: user.username,
                role: user.role
            };
            const tokenSecret = 'secret';
            const token = jwt.sign(tokendata, tokenSecret, { expiresIn: "1d" })

            res.cookie('token', token, { httpOnly: false })
            return res.json({
                sucess: true,
                message: "Login successfull",
                token: token,
                role: user.role
            })
        } else {
            return res.json({
                success: false,
                message: 'No user exists'
            });
        }
    } catch (error) {
        console.error("err at login route => ", error.message);
    }
});


app.post('/post', async (req, res) => {
    const { username, post } = req.body;
    try {

        const userQuery = `SELECT * FROM signup WHERE username = $1`;
        const userResult = await db.query(userQuery, [username]);

        if (userResult.rowCount !== 1) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const dbQuery = `INSERT INTO posts (post,username,post_date,status) VALUES ($1, $2,CURRENT_TIMESTAMP,300)`;
        await db.query(dbQuery, [post, username]);

        return res.status(201).json({
            success: true,
            message: "Post created successfully"
        });
    } catch (error) {
        console.error("Error posting post => ", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.put('/updatePost/:postId', async (req, res) => {
    const { postId } = req.params;
    const { updatedPost } = req.body;
    try {
        await db.query('UPDATE posts SET post = $1 WHERE id = $2', [updatedPost, postId]);
        res.json({ success: true, message: 'Post updated successfully' });
    } catch (error) {
        console.error("Error updating post: ", error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


app.post('/deletePost', async (req, res) => {
    const { postId } = req.body;
    try {

        const dbQuery = `DELETE FROM posts WHERE id = $1`;
        await db.query(dbQuery, [postId]);

        return res.json({
            success: true,
            message: 'Post deleted successfully'
        });
    } catch (error) {
        console.error("Error deleting post:", error.message);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.delete('/delete-post/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        await db.query('DELETE FROM posts WHERE id = $1', [postId]);
        return res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


app.get('/logout', (req, res) => {
    try {
        res.clearCookie('token');
        return res.json({
            success: true,
            message: "logout successfull"
        })

    } catch (error) {
        console.error("Err at logout route", error.message);
    }
})

app.post('/accept-post', isAdmin, async (req, res) => {
    const { postId } = req.body;
    try {
        await db.query('UPDATE posts SET status = $1 WHERE id = $2', [200, postId]);
        res.json({ success: true, message: 'Post accepted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ isLoggedIn: false });
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ isLoggedIn: false });
        } else {
            req.user = decoded;
            next();
        }
    });
};

app.get('/checkLogin', authenticateToken, (req, res) => {
    res.json({ isLoggedIn: true });
});




db.connect().then(() => {
    console.log("DB Connected");
}).catch((e) => {
    console.error("Err coonecting db => ", e.message);
})
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})