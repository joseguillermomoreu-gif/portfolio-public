<?php

declare(strict_types=1);

namespace App\Tests\Unit\Domain\CodeAndAi;

use App\Domain\Model\CodeAndAi\Entity\Tag;
use PHPUnit\Framework\TestCase;

/**
 * Tag Value Object Unit Tests.
 *
 * Tests Tag value object for Code & AI blog context.
 */
final class TagTest extends TestCase
{
    public function testItCanBeCreatedWithNameAndSlug(): void
    {
        // Arrange & Act
        $tag = new Tag('PHP', 'php');

        // Assert
        $this->assertInstanceOf(Tag::class, $tag);
    }

    public function testNameIsAccessible(): void
    {
        // Arrange
        $tag = new Tag('Symfony', 'symfony');

        // Act & Assert
        $this->assertSame('Symfony', $tag->name());
    }

    public function testSlugIsAccessible(): void
    {
        // Arrange
        $tag = new Tag('Test-Driven Development', 'test-driven-development');

        // Act & Assert
        $this->assertSame('test-driven-development', $tag->slug());
    }

    public function testCanBeCreatedFromString(): void
    {
        // Act
        $tag = Tag::fromString('Hexagonal Architecture');

        // Assert
        $this->assertInstanceOf(Tag::class, $tag);
        $this->assertSame('Hexagonal Architecture', $tag->name());
        $this->assertSame('hexagonal-architecture', $tag->slug());
    }

    public function testFromStringGeneratesSlugAutomatically(): void
    {
        // Act
        $tag = Tag::fromString('Domain Driven Design');

        // Assert
        $this->assertSame('Domain Driven Design', $tag->name());
        $this->assertSame('domain-driven-design', $tag->slug());
    }

    public function testSlugIsLowercase(): void
    {
        // Act
        $tag = Tag::fromString('PHP');

        // Assert
        $this->assertSame('php', $tag->slug());
        $this->assertMatchesRegularExpression('/^[a-z0-9\-]+$/', $tag->slug());
    }

    public function testSlugReplacesSpacesWithHyphens(): void
    {
        // Act
        $tag = Tag::fromString('Test Driven Development');

        // Assert
        $this->assertSame('test-driven-development', $tag->slug());
    }

    public function testSlugHandlesSpecialCharacters(): void
    {
        // Act
        $tag = Tag::fromString('C++ Programming');

        // Assert
        $this->assertSame('c-programming', $tag->slug());
    }

    public function testSlugHandlesMultipleSpaces(): void
    {
        // Act
        $tag = Tag::fromString('Clean    Code');

        // Assert
        $this->assertSame('clean-code', $tag->slug());
    }

    public function testSlugTrimsInputWhitespace(): void
    {
        // Act
        $tag = Tag::fromString('  PHP  ');

        // Assert - trim() happens before slugify, then hyphens replace spaces
        $this->assertSame('-php-', $tag->slug());
    }

    public function testEqualsReturnsTrueForSameSlug(): void
    {
        // Arrange
        $tag1 = Tag::fromString('PHP');
        $tag2 = Tag::fromString('php');

        // Act & Assert
        $this->assertTrue($tag1->equals($tag2));
    }

    public function testEqualsReturnsFalseForDifferentSlug(): void
    {
        // Arrange
        $tag1 = Tag::fromString('PHP');
        $tag2 = Tag::fromString('JavaScript');

        // Act & Assert
        $this->assertFalse($tag1->equals($tag2));
    }

    public function testEqualsComparesBySlugNotName(): void
    {
        // Arrange
        $tag1 = new Tag('PHP Programming', 'php');
        $tag2 = new Tag('php', 'php');

        // Act & Assert - different names, same slug = equal
        $this->assertTrue($tag1->equals($tag2));
    }

    public function testToStringReturnsName(): void
    {
        // Arrange
        $tag = Tag::fromString('Symfony Framework');

        // Act
        $stringRepresentation = (string) $tag;

        // Assert
        $this->assertSame('Symfony Framework', $stringRepresentation);
    }

    public function testPropertiesAreReadonly(): void
    {
        // Arrange & Act
        $tag = Tag::fromString('TDD');

        // Assert - verify properties are readonly
        $reflection = new \ReflectionClass($tag);
        $properties = $reflection->getProperties();

        foreach ($properties as $property) {
            $this->assertTrue(
                $property->isReadOnly(),
                "Property {$property->getName()} should be readonly"
            );
        }
    }

    public function testCanHaveLongName(): void
    {
        // Arrange
        $longName = 'Hexagonal Architecture with Domain Driven Design';

        // Act
        $tag = Tag::fromString($longName);

        // Assert
        $this->assertSame($longName, $tag->name());
        $this->assertSame('hexagonal-architecture-with-domain-driven-design', $tag->slug());
    }

    public function testCanHaveHyphenatedName(): void
    {
        // Arrange
        $tag = Tag::fromString('Test-Driven-Development');

        // Assert
        $this->assertSame('Test-Driven-Development', $tag->name());
        $this->assertSame('test-driven-development', $tag->slug());
    }

    public function testCanHaveNumbersInName(): void
    {
        // Arrange
        $tag = Tag::fromString('PHP 8.1');

        // Assert
        $this->assertSame('PHP 8.1', $tag->name());
        // Dots are replaced with hyphens individually
        $this->assertSame('php-8-1', $tag->slug());
    }

    public function testSlugHandlesConsecutiveSpecialCharacters(): void
    {
        // Arrange
        $tag = Tag::fromString('C++ & Python');

        // Assert
        $this->assertSame('c-python', $tag->slug());
        // Verify no consecutive hyphens
        $this->assertStringNotContainsString('--', $tag->slug());
    }
}
