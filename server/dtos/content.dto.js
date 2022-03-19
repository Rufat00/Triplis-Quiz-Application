module.exports = class ContentDto{
    author
    title
    describtion
    pin
    main_image
    duration
    create_date
    likes
    dislikes
    id

    constructor(model){
        this.author = model.author
        this.title =  model.title
        this.describtion = model.describtion
        this.pin = model.pin
        this.main_image =  model.main_image.url
        this.duration = model.duration
        this.create_date = model.create_date
        this.likes = model.likes
        this.dislikes = model.dislikes
        this.id = model._id
    }
}