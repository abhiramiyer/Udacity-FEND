/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it ('each feed has a URL defined', function() {
            allFeeds.forEach(function(item) {
                expect(item.url).toBeDefined();
                expect(item.url.length).toBeGreaterThan(0);
            });
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it ('each feed has a name defined', function() {
            allFeeds.forEach(function(item) {
                expect(item.name).toBeDefined();
                expect(item.name.length).toBeGreaterThan(0);
            });
        });

    });

    describe('The menu', function() {
        /* A test that ensures the menu element is
         * hidden by default. 
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('is visible when clicked and hidden when clicked again', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.trigger('click');
            // menu should be visible
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            menuIcon.trigger('click');
            // menu should be hidden
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('there is at least a single .entry within .feed', function(done) {
            expect($('.feed .entry-link .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feedContentOriginal, feedContentNew;
       
        beforeEach(function(done) {
            // load a new feed
            loadFeed(1, function() {
                feedContentOriginal = $('.feed').html();
                // load a different feed now
                loadFeed(0, done);
            });
        });

        it('when new feed is loaded, feed content changes', function(done) {
            feedContentNew = $('.feed').html();
            expect(feedContentNew).not.toEqual(feedContentOriginal);
            done();
        });

    });
}());
