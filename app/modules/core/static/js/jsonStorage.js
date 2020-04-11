const jsonStorage = {
    PREFIX: 'boardgame',
    getItem: function(key, default_value=null)
    {
        const value = localStorage.getItem(`${this.PREFIX}-${key}`)

        if (value === null)
            return default_value

        try
        {
            return JSON.parse(value)
        }
        catch(SyntaxError)
        {
            return default_value
        }
    },
    setItem: function(key, value)
    {
        localStorage.setItem(`${this.PREFIX}-${key}`, JSON.stringify(value))
    }
}