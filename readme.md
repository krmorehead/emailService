To call on the API after starting

```
curl -d '{"to": "susan@abcpreschool.org","to_name": "Miss Susan","from": "noreply@mybrightwheel.com","from_name": "brightwheel","subject": "Your Weekly Report","body": "<h1>Weekly Report</h1><p>You saved 10 hours this week!</p>"}' -H "Content-Type: application/json" -X POST "http://localhost:8080/email"
```
