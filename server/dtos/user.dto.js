module.exports = class UserDto{
    email
    name
    avatar
    id
    isActivated

    constructor(model){
        this.email = model.email;
        this.name = model.name;
        this.avatar = model.avatar.url;
        this.id = model._id;
        this.isActivated = model.isActivated;

    }
}