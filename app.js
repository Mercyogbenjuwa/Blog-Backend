const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const app = express();
const routes = require('./src/Routes/routes');
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
