/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against Feed Reader application.
 */

$(function() {

    // Tests the RSS feeds definitions.
    describe('RSS Feeds', function() {

        // Tests that the allFeeds variable has been defined and that it is not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Tests each feed in the allFeeds object and ensures it has a URL defined
        // and that the URL is not empty.
        it('should have a URL', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        // Tests each feed in the allFeeds object and ensures it has a name defined
        // and that the name is not empty.
         it('should have a name', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
         });
    });

    // Tests the menu visibility.
    describe('The menu', function() {
        let bodyElement = document.querySelector('body');
        let hasClass;

        // Tests that the menu element is hidden by default.
        it('should be hidden by default', function() {
            hasClass = bodyElement.classList.contains('menu-hidden');
            expect(hasClass).toBe(true);
        });

         // Tests that the menu changes visibility when the menu icon is clicked. 
        it('should be visible/hidden when the menu icon is clicked', function() {
            bodyElement.querySelector('.menu-icon-link').click();
            hasClass = bodyElement.classList.contains('menu-hidden');
            expect(hasClass).toBe(false);

            bodyElement.querySelector('.menu-icon-link').click();
            hasClass = bodyElement.classList.contains('menu-hidden');
            expect(hasClass).toBe(true);
        });
    });

    // Tests initial entries.
    describe('Initial Entries', function() {

        // Tests that there is at least a single .entry element within the .feed container
        // when the loadFeed function is called and executed.
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should contain a single entry element', function() {
            let feedEntry = document.querySelectorAll('.feed .entry');
            expect(feedEntry.length).not.toBe(0);
        });
    });

    // Tests New Feed Selection.
    describe('New Feed Selection', function() {

        // Tests that the content has changed after a new feed is loaded.
        let feedOne;
        let feedTwo;

        beforeEach(function(done) {
            loadFeed(1, function() {
                feedOne = document.querySelector('.feed .entry').innerText;
                loadFeed(0, function() {
                    feedTwo = document.querySelector('.feed .entry').innerText;
                    done();
                });
            });
        });

        it('should change the content', function() {
            expect(feedOne).not.toBe(feedTwo);
        });
    });
}());
