## amazon-clone
Build an Amazon clone: Nodejs + MongoDB + Stripe Payment (Udemy course)

Ref:
```
https://www.udemy.com/build-an-amazon-clone-nodejs-stripe-elasticsearch/
Check git log, branches, pm/history.txt for development progress
```

DONE:
### Setup project
- setup project by run npm init
- add pm/history.txt for project management purpose
- setup git and add first commit
- add eslint and config
- connected to mlab database
	- note about mongodb://<dbuser>:<dbpassword>@ds261138.mlab.com:61138/amazonclone
	- here *dbuser* need to be created on user tab on selected db, this is not *account* used to login to mlab itself.


### mongoose and arow function
- mongoose *Schema.pre* must has a function style callback not arrow function because 
of fat arrow lexically binds the function to current scope so *this*
will not be *Schema* instance


### cookie-parser, express-session, express-flash
- both cookie and session are place to store data
- cookie store data on client side, thus can be accessed by user
  - cookie is sent by browser to server each request
  - _cookie-parser_ is used to parser that cookie
- session store data on server side, thus cannot be accessed by user
  - server identify user using a session id (session.sid)
  - session.sid is stored in cookie (signed or unsinged)
  - because cookie is sent by browser to server each request, 
  server will get session.sid from cookie to identify user from session
  - _express-session_ is used to handle above steps
- _express-flash_ using exppres-session to pass message from route to route


### Passport work follow
- route use passport.authenticate('local-login')
- if user authen successfully, user object shall be passed to passport return done(null, user); passport will then call passport.serializeUser to get which information should be saved into *session* (here user._id)
- then on another route passport get that saved info and give to passport.deserializeUser and the *req.user* shall be assiged to *user* got from done(err, user); in deserializeUser function


### Fixed issue related to session sometime cannot be saved before redirecting
- For example when user login succesfully we redirect he/she to his/her profile page. On that route we check for *req.user* which should be set by passport. But there is some cases when user login succesfully we call redirect, and redirecting happened before *session*, which has user info from passport.serializeUser, be saved. Thus, on *profile* route passport cannot get user info back from session, cannot call passport.deserializeUser and cannot set *req.user*
- Because *req.user* is not set, request shall be redirect to login page again.
- FIX: (this is temporary, should check more)

node_modules/express-session/index.js ( comment line: return writetop(); add line: return; )
```js    
if (shouldSave(req)) {
  req.session.save(function onsave(err) {
    if (err) {
      defer(next, err);
    }
    writeend();
  });
  // return writetop();
  return;
  ...
}
```  
    
    
### Install elasticsearch:

    https://memto.github.io/linux/tooltips/2018/04/04/elasticsearch-ubuntu-16-04/


### mongoosastic and elasticsearch: 

    https://memto.github.io/linux/program/tooltips/2018/04/04/mongoosastic-4-4-1-and-elasticsearch-6-2-3/

- Another temporary fix for: '[mapper_parsing_exception] No handler for type [string] declared on field [category]'
    
node_modules/mongoosastic/lib/mapping-generator.js
```js    
function getTypeFromPaths (paths, field) {
    let type = false

    if (paths[field] && paths[field].options.type === Date) {
      return 'date'
    }

    if (paths[field] && paths[field].options.type === Boolean) {
      return 'boolean'
    }

    if (paths[field] && paths[field].options.type === String) {
      return 'text'
    }
    ...
}


function getMapping (cleanTree, inPrefix) {
  ...
  // If it is a objectid make it a string.
  if (value.type === 'objectid') {
    if (value.ref && value.es_schema) {
      mapping[field].type = 'object'
      mapping[field].properties = getMapping(value, prefix + field)
      continue
    }
    // do not continue here so we can handle other es_ options
    mapping[field].type = 'text'
  }
  ...
}
```

### mongosastic / elasticsearch error
- Error: [illegal_argument_exception] mapper [category] of different type, current type [string], merged_type [ObjectMapper]
- Cause: this is because there is already index in elasticsearch with category mapping as type string
- Fix: delete existed index: curl -XDELETE http://localhost:9200/products

TODO:
