const express = require('express');
const Joi = require('joi');
const router = express.Router();

const tablets = [
    {id: 1, name: "alfatiha"},
    {id: 2, name: "albaquara"},
    {id: 3, name: "alma1ida"},
    {id: 4, name: "anisa1"},
]

const coments_tablet = [];
// premisse de li
router.get('/', (req, res) => {
    res.render('li', {title: 'list des tablets du li programme'});
});
router.get('/:id', (req, res) => {
    const tablet = tablets.find(c => c.id === parseInt(req.params['id']));
    if(!tablet) res.status(404).send(`la tablet avec le numero ${req.params.id} n existe pas`)
    res.send(tablet); 
});
router.post('/:id', (req, res) => {
    // ajouter des tablets à son agenda
    const tab_id = parseInt(req.params.id);
    const email= req.body.email;
    const { error } = validateMail(email);
        if(error) return res.status(400).send(result.error.details[0].message);
        const m_user = users.find(u => u.email === email);
        users.push({  email:email,
                      name: m_user.name, 
                      tab_id
                    });
        res.send(`vous etes bien inscrit et la tablet ${JSON.stringify(users)}`);     
});
// ____UC modifier un commentaire sur tablet 
router.put('/:id',(req, res) => {
    // if tablet exist
    
    if(tablets.find(t => t.id === parseInt(req.params.id))) {
        //commentaire user / exit / have a coment to modify
        const req_u = req.body.email;
        const req_m = req.body.coment;
        const user = users.find(u => u.email === req_u)
        if(!user) return res.status(404).send(`l utilisateur ${req_u} n est pas inscrit pour ajouter un comentaire`)
            
        const coment_user = {
            email: req_u,
            coment: req_m
        };
        coments_tablet.push(coment_user);
        res.send(`le comentaire ${coment_user.email} a ${coment_user.coment} bien été ajouté`);    
    }
     res.status(404).send('the tablet requested don t exist')   // if not existing error 404
    // 
    // submit the coment // or update // and diffuse + return notification
});
// delet coments sur une tablet

router.delete('/:id', (req, res) => {
    const req_mail = req.body.email;
    const user = users.find(us => us.email === req_mail);
    console.log(user);
    const coment = coments_tablet.find(c => c.email === req_mail);
    console.log(coment);
    if(user && coment ){
        const coment_index =coments_tablet.indexOf(coment);
        coments_tablet.splice(coment_index,1); 
        return res.send(`le comentaire ${coment} is deleted`); 
    }
    
}); 
router.get('/:soura/:aya', (req, res) => {
    res.send({params:req.params,
        query: req.query}
        ); 
});

function validateUser(user) {
    const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        });
    
    const result =  Joi.validate(user, schema);
    return result;
}
function validateMail(mail) {
    const schema =  Joi.string().email({ minDomainAtoms: 2 }).required();
    const result =  Joi.validate(mail, schema);
    return result;
}

module.exports = router;