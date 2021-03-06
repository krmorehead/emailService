<h2>How to install and run your service</h2>

<p>In the root of your directory Create a local .env.json to maintain keys</p>

<p>Make sure to add in your own api keys</p>

```
{
  "spendgridApiKey": <your api key>,
  "snailgunApiKey": <your api key>
}
```

Once your secrets are in place run `npm install`
Once that has finished resolving you should be able to run `npm run start` and have it start up a server on port 8080.

Once the server is live you can test it with a curl command (or other method) such as below
```
curl -d '{"to": "susan@abcpreschool.org","to_name": "Miss Susan","from": "noreply@mybrightwheel.com","from_name": "brightwheel","subject": "Your Weekly Report","body": "<h1>Weekly Report</h1><p>You saved 10 hours this week!</p>"}' -H "Content-Type: application/json" -X POST "http://localhost:8080/email"
```

Once you `curl` the application it should successfully resolve with sending your email

<h2>Configuration</h2>
`configuration/configuration.ts` drives the integrations that are configured.
The application is set up to be able to use 1 or more integrations at a time with a smart failing mechanism for `N` integrations.

The integrations will fail in the order of the array provided. Should only 1 integration be provided then that is the only integration that will be used.

<h2>Which language, framework and libraries you chose and why</h2>

<h3>Language</h3>
<p>Express with Typescript was selected for this project</p>
Express - Express was selected as a common Server side technology. It has built in multi-threading which generally helps quite a bit for throughput. Although Javascript can have scaling issues when doing a great amount of CPU processing the current project has minimal email processing that occurs, and that which does occur is closely tied into the Javascript library as it is string HTML.

Typescript - As a framework typescript allows for interfaces and type checking which makes organizing and maintaining code much easier than raw JS, expecially in large projects. It also have more object oriented opinions than raw JS which often saves headaches in the long run (especially around types)

<h2>Libraries</h2>
html-to-text - initial attempts with JSDOM and TSDOM did not play with my tsconfig properly, long term I think the tsconfig could be set up differently but short term this library is also perfectly good.
chai/mocha - I only have a few unit tests but even setting up just those few really helped to test in isolation from the rest of the code

ts-node - allows for real time compiling of typescript without generating all the `js` files. Unfortunately I had some trouble getting it running with my debugger in the time period.


<h2>Tradeoffs you might have made, anything you left out, or what you might do differently if
you were to spend additional time on the project </h2>
With another hour of work I was able to resolve the library issue by swapping over to a different library that had the expected `type` declarations and was able to debug the issues I was having with the socket hangup.

My first 3 hours probably had too much time working on boilerplate code causing my slowdown on the first pass.

Overall I am happy with my architecture
 - Email Router -> Email Controller which corrals a few Email Service Calls
 - Email Service -> Responsible for Validation, processing, and calling on Integration Factory
 - Integration Factory -> Responsible for fetching the proper integrations that the Service needs to use.
 - Email Integration Factory uses result to call on the proper handlers (here maybe this isn't the responsibility of the email service but instead could be offloaded to some sort of more generic factory)
 - Each handler is a stand alone piece of code that can be called for each of the end points. And each handler has all of the host information set up. They will fetch their API key from the secrets file that the engineer has set up.

Possible memory leak with millions of calls
 - Because this creates some new instances and new calls with each call of the API there is potential for exploitation by malicious users calling on the API excessively. Additionally performance should likely be tracked for huge throughput to make sure that it is scaling as expected.

<h2>Anything else you wish to include.</h2>
Future extensions - The integration layer can be made much more configurable.

Additionally while this particular use case has a set up where it make sense to rotate to the next API if the first one fails there are other patterns that might make sense for other API's.

For example - On a `/GET` API for email you may wish to have multiple integrations the `merge` their results together which would require adding a layer of configuration to the integrations.
