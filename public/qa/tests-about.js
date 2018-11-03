suite('Тесты страницы "О нас"', function(){
    test('страница должна содержать ссылку на страницу контактов', function(){
        assert($('a[href="/contact"]').length);
    });
});