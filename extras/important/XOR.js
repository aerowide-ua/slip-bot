var XOR =
{
    encrypt: function(input, key)
    {
        input = typeof input === 'object' ? JSON.stringify(input) : input.toString();
        key = typeof key === 'object' ? JSON.stringify(key) : key.toString();
        var cipherText = '';
        var length = input.length;

        for(var i=0; i < length; i++)
        {
            cipherText += String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(Math.floor(i % key.length)));
        }

        var encodedText = btoa(cipherText)
        return encodedText;
    },

    decrypt: function(input, key)
    {
        key = typeof key === 'object' ? JSON.stringify(key) : key.toString();
        var decodedText = atob(input);
        var plainText = '';
        var length = decodedText.length;

        for(var i=0; i < length; i++)
        {
            plainText += String.fromCharCode(decodedText.charCodeAt(i) ^ key.charCodeAt(Math.floor(i % key.length)));
        }

        return plainText;
    }
};

// via https://gist.github.com/mhingston/9e7d608145381097bde949ca7558c919