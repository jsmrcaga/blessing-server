# Blessing Server

This is the server for the [`Blessing` app](https://github.com/jsmrcaga/blessing).

[`Blessing`](https://github.com/jsmrcaga/blessing) is a simple NodeJS module that keeps track
of how many times you call it. 

### Installation
* Clone the repo
* `npm install`
* `npm start`

### Usage

#### Routes
##### `GET /`

Returns the current `counter`, which is a collection of:
```json
{
	Apps: {
		<App Name>:{
			counter: Int,
			[name]: String
		}
	}
}
```

##### `POST /`

Accepts an `application/json` body, of the type:

```json
{
	app_id: UUID
	name: String
}

```