from django import forms
from .models import Order, Review


class OrderForm(forms.ModelForm):
    """Форма оформления заказа"""
    
    class Meta:
        model = Order
        fields = ['first_name', 'last_name', 'email', 'phone', 'address', 'city', 'postal_code', 'comment']
        widgets = {
            'first_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Иван',
                'required': True,
            }),
            'last_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Иванов',
                'required': True,
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'ivan@example.com',
                'required': True,
            }),
            'phone': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '+7 (999) 123-45-67',
                'required': True,
            }),
            'address': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'ул. Примерная, д. 1, кв. 1',
                'rows': 3,
                'required': True,
            }),
            'city': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Москва',
                'required': True,
            }),
            'postal_code': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '123456',
                'required': True,
            }),
            'comment': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Дополнительная информация к заказу...',
                'rows': 3,
            }),
        }


class ReviewForm(forms.ModelForm):
    """Форма отзыва"""
    
    class Meta:
        model = Review
        fields = ['author_name', 'author_role', 'rating', 'text']
        widgets = {
            'author_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Ваше имя',
                'required': True,
            }),
            'author_role': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Должность / Компания',
            }),
            'rating': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': 1,
                'max': 5,
                'value': 5,
                'required': True,
            }),
            'text': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Напишите ваш отзыв...',
                'rows': 4,
                'required': True,
            }),
        }
