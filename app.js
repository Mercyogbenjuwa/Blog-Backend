const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const PORT = process.env.PORT || 3001
const app = express();
const routes = require('./src/Routes/routes');
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

