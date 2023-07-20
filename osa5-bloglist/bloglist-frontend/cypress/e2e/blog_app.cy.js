describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'testUser',
      name: 'TestUser',
      password: 'salainen',
      blogs: []
    }
    const user2 = {
      username: 'testUser2',
      name: 'TestUser2',
      password: 'salainen',
      blogs: []
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user2)
    // baseUrl is defined in the cypress.config.js-file
    cy.visit('')
  })

  it('login-form is shown', function() {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function(){
    it('login succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('testUser')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('TestUser logged in')
    })

    it('login fails with wrong password', function() {
      cy.contains('login').click()
      cy.get('#username').type('testUser')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('#notification').contains('wrong username or password')
      cy.get('html').should('not.contain', 'TestUser logged in')
    })
  })


  describe('when logged in', function() {
    beforeEach(function() {
      // Functions reside in the commands.js-file
      cy.login({ username: 'testUser', password: 'salainen' })
    })

    it('a new blog can be created', function() {
      cy.contains('add a new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress-test-author')
      cy.get('#url').type('cypress-test-url')
      cy.contains('create').click()

      cy.get('.blog').should('contain', 'a blog created by cypress')
    })

    describe('a blog exists', function () {
      beforeEach(function () {
        // Functions reside in the commands.js-file
        cy.login({ username: 'testUser', password: 'salainen' })
        cy.createBlog({ title: 'first test title', auhtor: 'first test auhtor', url: 'testurl', likes: 1 })

        cy.login({ username: 'testUser2', password: 'salainen' })
        cy.createBlog({ title: 'second test title', auhtor: 'second test auhtor', url: 'testurl', likes: 3 })
        cy.createBlog({ title: 'third test title', auhtor: 'second test auhtor', url: 'testurl', likes: 2 })

        cy.login({ username: 'testUser', password: 'salainen' })
      })

      it('blog can be liked by user', function () {
        // number of likes increases when like-button is clicked
        cy.contains('.blog', 'second test title').find('.viewButton').click()
        cy.contains('.blogShowAll', 'second test title').find('.likeButton').click()
        cy.contains('.blogShowAll', 'second test title').contains('likes 4')
      })

      it('blog can be removed by user who have added the blog', function () {
        // delete button exists in the blog that has been created by the currently logged-in user
        cy.contains('.blog', 'first test title').find('.viewButton').click()
        cy.contains('.blogShowAll', 'first test title').find('.deleteButton')

        // delete button does not exist on the second blog that hasn't been created by the currently logged-in user
        cy.contains('.blog', 'second test title').find('.viewButton').click()
        cy.contains('.deleteButton').should('not.exist')
      })

      it('blogs are arranged according to the number of likes', function() {
        // on the last place is the first blog title that has one like
        cy.get('.blog').eq(-1).should('contain', 'first test title')
        // on the first place is the second blog title that has three likes
        cy.get('.blog').eq(0).should('contain', 'second test title')

        // create new blogs with 0 and 4 likes
        cy.createBlog({ title: 'fifth test title', auhtor: 'second test auhtor', url: 'testurl', likes: 0 })
        cy.createBlog({ title: 'fourth test title', auhtor: 'second test auhtor', url: 'testurl', likes: 4 })

        // test that they are placed on the last and the first places inside the list of blogs
        cy.get('.blog').eq(-1).should('contain', 'fifth test title')
        cy.get('.blog').eq(0).should('contain', 'fourth test title')
      })
    })
  })
})

