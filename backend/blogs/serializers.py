from django.conf import settings
from rest_framework.serializers import CharField, ImageField, ModelSerializer, ReadOnlyField, SerializerMethodField

from .models import Applaud, Blog, Comment, ReadingList, Tag


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']
        read_only_fields = ['slug']


class BlogSerializer(ModelSerializer):

    author_username = CharField(source='author.username', read_only=True)
    author_profile_image = ImageField(
        source='author.profile_image', read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    cover_image = SerializerMethodField()

    class Meta:
        model = Blog
        fields = ['id', 'title', 'slug', 'subtitle', 'cover_image', 'content', 'category', 'created_at',
                  'status', 'applaud_count', 'author', 'author_username', 'author_profile_image', 'tags']

    def get_cover_image(self, obj):
        if obj.cover_image:
            if hasattr(obj.cover_image, 'url'):
                url = obj.cover_image.url
                if url.startswith('http'):
                    return url
                request = self.context.get('request')
                if request:
                    return request.build_absolute_uri(url)
                return settings.MEDIA_URL + url.lstrip('/') if url else None
        return None

    def create(self, validated_data):
        tag_ids = self.context.get('tag_ids', [])
        blog = Blog.objects.create(**validated_data)
        if tag_ids:
            tags = Tag.objects.filter(id__in=tag_ids)
            blog.tags.set(tags)
        return blog

    def update(self, instance, validated_data):
        tag_ids = self.context.get('tag_ids', None)
        
        for key, data in validated_data.items():
            if key == 'cover_image':
                instance.cover_image.delete(save=False)
            setattr(instance, key, data)

        instance.save()
        
        if tag_ids is not None:
            tags = Tag.objects.filter(id__in=tag_ids)
            instance.tags.set(tags)

        return instance


class CommentSerializer(ModelSerializer):

    user_username = CharField(source='user.username', read_only=True)
    user_profile_image = ImageField(
        source='user.profile_image', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_at', 'blog',
                  'user', 'user_username', 'user_profile_image']


class ApplaudSerializer(ModelSerializer):

    class Meta:
        model = Applaud
        fields = '__all__'


class ReadingListSerializer(ModelSerializer):
    blog_details = BlogSerializer(source='blog', read_only=True)

    class Meta:
        model = ReadingList
        fields = ['blog', 'user', 'blog_details']
